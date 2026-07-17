const { WorkSchedule, User, sequelize } = require("../Models/index");
const reminderService = require("./reminderService");

const create = async (data, currentUser) => {
    return await sequelize.transaction(async (t) => {
        const user = await User.findByPk(data.user_id, {
            transaction: t
        });

        if (!user) {
            throw new Error("User not found");
        }

        const workSchedule = await WorkSchedule.create({
            user_id: data.user_id,
            work_date: data.work_date,
            start_time: data.start_time,
            end_time: data.end_time,
            shift: data.shift,
            notes: data.notes
        }, {
            transaction: t
        });

        await reminderService.notifyScheduleCreated(
            workSchedule,
            t
        );

        return workSchedule;
    });
};

const getAll = async (currentUser) => {
    const isAdmin = currentUser.roles && currentUser.roles.includes("admin");

    const queryOptions = {
        include: [
            {
                model: User,
                attributes: ["first_name", "last_name"]
            }
        ]
    };

    if (!isAdmin) {
        queryOptions.where = { user_id: currentUser.user_id };
    }

    return await WorkSchedule.findAll(queryOptions);
};

const getWorkScheduleById = async (id, currentUser) => {
    const isAdmin = currentUser.roles && currentUser.roles.includes("admin");

    const workSchedule = await WorkSchedule.findByPk(id, {
        include: [
            {
                model: User,
                attributes: [
                    "first_name",
                    "last_name",
                    "email"
                ]
            }
        ]
    });

    if (!workSchedule) {
        throw new Error("Work schedule not found");
    }

    if (!isAdmin && Number(workSchedule.user_id) !== Number(currentUser.user_id)) {
        throw new Error("Unauthorized to view this work schedule");
    }

    return workSchedule;
};

const updateWorkSchedule = async (id, data, currentUser) => {
    const isAdmin = currentUser.roles && currentUser.roles.includes("admin");

    return await sequelize.transaction(async (t) => {
        const workSchedule = await WorkSchedule.findByPk(id, {
            transaction: t
        });

        if (!workSchedule) {
            throw new Error("Work schedule not found");
        }

        if (!isAdmin && Number(workSchedule.user_id) !== Number(currentUser.user_id)) {
            throw new Error("Unauthorized to update this work schedule");
        }

        if (
            data.user_id &&
            Number(data.user_id) !== Number(workSchedule.user_id)
        ) {
            const newUser = await User.findByPk(data.user_id, {
                transaction: t
            });

            if (!newUser) {
                throw new Error("New employee not found");
            }
        }

        await workSchedule.update({
            user_id: data.user_id,
            work_date: data.work_date,
            start_time: data.start_time,
            end_time: data.end_time,
            shift: data.shift,
            notes: data.notes
        }, {
            transaction: t
        });

        await reminderService.notifyScheduleUpdated(
            workSchedule,
            t
        );

        return {
            message: "Work schedule updated successfully"
        };
    });
};

const deleteWorkSchedule = async (id, currentUser) => {
    const isAdmin = currentUser.roles && currentUser.roles.includes("admin");

    return await sequelize.transaction(async (t) => {
        const workSchedule = await WorkSchedule.findByPk(id, {
            transaction: t
        });

        if (!workSchedule) {
            throw new Error("Work schedule not found");
        }

        if (!isAdmin && Number(workSchedule.user_id) !== Number(currentUser.user_id)) {
            throw new Error("Unauthorized to delete this work schedule");
        }

        await workSchedule.destroy({
            transaction: t
        });

        return {
            message: "Work schedule deleted successfully"
        };
    });
};

module.exports = {
    create,
    getAll,
    getWorkScheduleById,
    updateWorkSchedule,
    deleteWorkSchedule
};