const { Supplier, sequelize } = require("../Models/index");

const createSupplier = async (name, phone, email, address) => {
    return await sequelize.transaction(async (t) => {
        return await Supplier.create({
            name,
            phone,
            email,
            address
        }, { transaction: t });
    });
};

const getAllSuppliers = async () => {
    return await Supplier.findAll();
};

const findById = async (id) => {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) throw new Error("Supplier not found");
    return supplier;
};

const updateSupplier = async (id, data) => {
    return await sequelize.transaction(async (t) => {
        const supplier = await Supplier.findByPk(id, { transaction: t });
        if (!supplier) throw new Error("Supplier not found");

        await supplier.update(data, { transaction: t });
        return supplier;
    });
};

const deleteSupplier = async (id) => {
    return await sequelize.transaction(async (t) => {
        const supplier = await Supplier.findByPk(id, { transaction: t });
        if (!supplier) throw new Error("Supplier not found");

        await supplier.destroy({ transaction: t });
        return { message: "Supplier deleted successfully" };
    });
};

module.exports = {
    createSupplier,
    getAllSuppliers,
    findById,
    updateSupplier,
    deleteSupplier
};