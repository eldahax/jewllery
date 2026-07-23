const discountService = require("../services/discountService");

const createDiscount = async (req, res) => {
    try {
        const discount = await discountService.createDiscount(req.body);
        res.status(201).json(discount);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllDiscounts = async (req, res) => {
    try {
        const discounts = await discountService.getAllDiscounts();
        res.status(200).json(discounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getDiscountById = async (req, res) => {
    try {
        const discount = await discountService.getById(req.params.id);
        res.status(200).json(discount);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const updateDiscount = async (req, res) => {
    try {
        const discount = await discountService.updateDiscount(req.params.id, req.body);
        res.status(200).json(discount);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteDiscount = async (req, res) => {
    try {
        const result = await discountService.deleteDiscount(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

module.exports = {
    createDiscount,
    getAllDiscounts,
    getDiscountById,
    updateDiscount,
    deleteDiscount
};