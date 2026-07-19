const { Reminder, User, sequelize } = require("../Models/index");
const { Op } = require("sequelize");

const isStaff = (roles = []) => roles.includes("admin") || roles.includes("manager");



const validateReminderInput = ({ title, remindAt, user_id }) => {
    if (!user_id) throw new Error("User ID is required");
    if (!remindAt) throw new Error("Reminder date/time is required");
    if (!title || !title.trim()) throw new Error("Title is required");
};

const getUserOrThrow = async (user_id, t) => {
    const user = await User.findByPk(user_id, { transaction: t });
    if (!user) throw new Error("User not found");
    return user;
};

const validateReminderDate = (remindAtInput) => {
    const remindAt = new Date(remindAtInput);
    if (isNaN(remindAt.getTime())) {
        throw new Error("Invalid reminder date");
    }
    return remindAt;
};

const requireUser = (currentUser) => {
    if (!currentUser || !currentUser.user_id) {
        throw new Error("Unauthorized: not logged in");
    }
};

const requireOwnerOrStaff = (reminder, currentUser) => {
    const roles = currentUser.roles || [];
    if (!isStaff(roles) && reminder.user_id !== currentUser.user_id) {
        throw new Error("Unauthorized: this reminder doesn't belong to you");
    }
};


const create = async (data) => {
    const t = await sequelize.transaction();

    try {
        validateReminderInput(data);
        await getUserOrThrow(data.user_id, t);
        const remindAt = validateReminderDate(data.remindAt);

        const reminder = await Reminder.create(
            {
                title: data.title.trim(),
                description: data.description,
                remindAt,
                user_id: data.user_id,
                sent: false,
            },
            { transaction: t }
        );

        await t.commit();
        return reminder;
    } catch (err) {
        await t.rollback();
        throw new Error(err.message);
    }
};

const getAll = async (currentUser) => {
    requireUser(currentUser);
    const roles = currentUser.roles || [];
    const whereCondition = {};

    if (!isStaff(roles)) {
        whereCondition.user_id = currentUser.user_id;
    }

    return await Reminder.findAll({
        where: whereCondition,
        include: [{ model: User, as: "user", attributes: ["first_name", "last_name", "email"] }],
        order: [["remindAt", "DESC"]],
    });
};

const getById = async (id, currentUser) => {
    requireUser(currentUser);

    const reminder = await Reminder.findByPk(id, {
        include: [{ model: User, as: "user", attributes: ["first_name", "last_name", "email"] }],
    });
    if (!reminder) throw new Error("Reminder not found");

    requireOwnerOrStaff(reminder, currentUser);
    return reminder;
};

const update = async (id, data, currentUser) => {
    requireUser(currentUser);
    const t = await sequelize.transaction();

    try {
        const reminder = await Reminder.findByPk(id, { transaction: t });
        if (!reminder) throw new Error("Reminder not found");

        requireOwnerOrStaff(reminder, currentUser);

        let remindAt = reminder.remindAt;
        if (data.remindAt) {
            remindAt = validateReminderDate(data.remindAt);
        }

        if (data.user_id && data.user_id !== reminder.user_id) {
            await getUserOrThrow(data.user_id, t);
        }

        await reminder.update(
            {
                title: data.title?.trim() || reminder.title,
                description: data.description ?? reminder.description,
                remindAt,
                user_id: data.user_id || reminder.user_id,
                sent: typeof data.sent === "boolean" ? data.sent : reminder.sent,
            },
            { transaction: t }
        );

        await t.commit();
        return reminder;
    } catch (err) {
        await t.rollback();
        throw new Error(err.message);
    }
};

const remove = async (id, currentUser) => {
    requireUser(currentUser);
    const t = await sequelize.transaction();

    try {
        const reminder = await Reminder.findByPk(id, { transaction: t });
        if (!reminder) throw new Error("Reminder not found");

        requireOwnerOrStaff(reminder, currentUser);

        await reminder.destroy({ transaction: t });
        await t.commit();
        return { message: "Reminder deleted successfully" };
    } catch (err) {
        await t.rollback();
        throw new Error(err.message);
    }
};

const markAsSent = async (id, currentUser) => {
    requireUser(currentUser);
    const t = await sequelize.transaction();

    try {
        const reminder = await Reminder.findByPk(id, { transaction: t });
        if (!reminder) throw new Error("Reminder not found");

        requireOwnerOrStaff(reminder, currentUser);

        if (reminder.sent) {
            throw new Error("Reminder already marked as sent");
        }

        await reminder.update({ sent: true }, { transaction: t });
        await t.commit();
        return reminder;
    } catch (err) {
        await t.rollback();
        throw new Error(err.message);
    }
};


const notifyOrderPlaced = async (order, remindAt, t) => {
    return await Reminder.create(
        {
            title: "Order placed",
            description: `Your order #${order.order_id || order.id} has been placed successfully.`,
            remindAt: remindAt ? validateReminderDate(remindAt) : new Date(),
            user_id: order.user_id,
            sent: false,
        },
        t ? { transaction: t } : undefined
    );
};

const notifyOrderPaid = async (order, remindAt, t) => {
    return await Reminder.create(
        {
            title: "Payment confirmed",
            description: `Payment for order #${order.order_id || order.id} was received. Thank you!`,
            remindAt: remindAt ? validateReminderDate(remindAt) : new Date(),
            user_id: order.user_id,
            sent: false,
        },
        t ? { transaction: t } : undefined
    );
};

const notifyLowStock = async (inventoryItem, remindAt, t) => {
    const staff = await User.findAll({
        where: { role: ["admin", "manager"] },
        transaction: t,
    });

    if (staff.length === 0) {
        console.warn("notifyLowStock: no admin/manager users found");
        return [];
    }

    return await Promise.all(
        staff.map((person) =>
            Reminder.create(
                {
                    title: "Low stock alert",
                    description: `${inventoryItem.item_name || inventoryItem.product_name} is running low (qty: ${inventoryItem.quantity}).`,
                    remindAt: remindAt ? validateReminderDate(remindAt) : new Date(),
                    user_id: person.user_id,
                    sent: false,
                },
                t ? { transaction: t } : undefined
            )
        )
    );
};

const notifyScheduleCreated = async (workSchedule, t) => {
    return await Reminder.create(
        {
            title: "New work schedule",
            description: `You have a new work schedule for ${workSchedule.work_date}. Shift: ${workSchedule.shift} (${workSchedule.start_time} - ${workSchedule.end_time}).`,
            remindAt: new Date(),
            user_id: workSchedule.user_id,
            sent: false,
        },
        t ? { transaction: t } : undefined
    );
};

const notifyScheduleUpdated = async (workSchedule, t) => {
    return await Reminder.create(
        {
            title: "Work schedule updated",
            description: `Your work schedule for ${workSchedule.work_date} has been updated. New shift: ${workSchedule.shift} (${workSchedule.start_time} - ${workSchedule.end_time}).`,
            remindAt: new Date(),
            user_id: workSchedule.user_id,
            sent: false,
        },
        t ? { transaction: t } : undefined
    );
};

const getDueUnsent = async () => {
    return await Reminder.findAll({
        where: {
            remindAt: { [Op.lte]: new Date() },
            sent: false,
        },
        include: [{ model: User, as: "user", attributes: ["first_name", "last_name", "email"] }],
    });
};

const markDelivered = async (id) => {
    const reminder = await Reminder.findByPk(id);
    if (!reminder) return;
    await reminder.update({ sent: true });
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    markAsSent,
    notifyOrderPlaced,
    notifyOrderPaid,
    notifyLowStock,
    notifyScheduleUpdated,
    notifyScheduleCreated,
    getDueUnsent,
    markDelivered,
};