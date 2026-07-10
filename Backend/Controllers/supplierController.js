const supplierService = require("../Services/SupplierService");

const create = async (req, res) => {
    try {
        const { name, phone, email, address } = req.body;
        const newSupplier = await supplierService.createSupplier(name, phone, email, address);
        res.status(201).json(newSupplier);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAll = async (req, res) => {
    try {
        const suppliers = await supplierService.getAllSuppliers();
        res.status(200).json(suppliers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteS = async (req, res) => {
    try {
        const result = await supplierService.deleteSupplier(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const findByPk = async (req, res) => {
    try {
        const supplier = await supplierService.findById(req.params.id);
        res.status(200).json(supplier);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const updatedSupplier = await supplierService.updateSupplier(req.params.id, req.body);
        res.status(200).json(updatedSupplier);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    create,
    getAll,
    deleteS,
    findByPk,
    update
};