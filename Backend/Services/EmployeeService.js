const { User, Role, UserRole, Employee, sequelize } = require("../Models/index");

const createEmployee = async (first_name, last_name, email, phoneNumber, hashedPassword, badge_number) => {
    const transaction = await sequelize.transaction();
    try {
        const existingUser = await User.findOne({ where: { email }, transaction });
        if (existingUser) throw new Error("This user already exists");

        const role = await Role.findOne({ where: { role_name: "employee" }, transaction });
        if (!role) throw new Error("Role 'employee' does not exist");

        const newUser = await User.create({
            first_name, last_name, email, phoneNumber, password_hash: hashedPassword
        }, { transaction });

        await UserRole.create({ user_id: newUser.user_id, role_id: role.role_id }, { transaction });
  
    const employee = await Employee.create({
        user_id: newUser.user_id,
        badge_number: badge_number 
    }, { transaction });
  

        await transaction.commit();
        return newUser; 
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const getAllEmployees = async () => {
    return await Employee.findAll({
        include: [{ model: User, attributes: ["first_name", "last_name", "email"] }]
    });
};

const deleteE = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        await Employee.destroy({ where: { user_id: id }, transaction });
        await UserRole.destroy({ where: { user_id: id }, transaction });
        await User.destroy({ where: { user_id: id }, transaction });
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const getById = async (id) => {
    return await Employee.findByPk(id, {
        include: [{ model: User }]
    });
};

const update = async (id, data) => {
    const transaction = await sequelize.transaction();
    try {
        const employee = await Employee.findOne({ 
            where: { user_id: id }, 
            transaction 
        });
        if (!employee) throw new Error("Employee not found");


        const user = await User.findByPk(employee.user_id, { transaction });
        if (!user) throw new Error("User not found");

        if (data.email && data.email !== user.email) {
            const emailExists = await User.findOne({
                where: { email: data.email },
                transaction
            });
            if (emailExists) throw new Error("Email is already in use");
        }

        await user.update({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
        }, { transaction });

        await employee.update({
            badge_number: data.badge_number
        }, { transaction });

        await transaction.commit();

        return { 
            ...employee.toJSON(), 
            User: user.toJSON() 
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
module.exports = { createEmployee, getAllEmployees, deleteE, getById, update };