const { Discount, Product } = require("../Models/index");

const createDiscount = async (data) => {

    const product = await Product.findByPk(data.product_id);

    if (!product) {
        throw new Error("Product not found");
    }

    return await Discount.create({
        product_id: data.product_id,
        discount_percentage: data.discount_percentage || null,
        discount_amount: data.discount_amount || null,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        is_active: data.is_active !== undefined ? data.is_active : true
    });

};

const getAllDiscounts = async () => {

    return await Discount.findAll({
        include: [{ model: Product }]
    });

};

const getById = async (id) => {

    const discount = await Discount.findByPk(id, {
        include: [{ model: Product }]
    });

    if (!discount) {
        throw new Error("Discount not found");
    }

    return discount;

};

const updateDiscount = async (id, data) => {

    const discount = await Discount.findByPk(id);

    if (!discount) {
        throw new Error("Discount not found");
    }

    await discount.update({
        discount_percentage: data.discount_percentage !== undefined ? data.discount_percentage : discount.discount_percentage,
        discount_amount: data.discount_amount !== undefined ? data.discount_amount : discount.discount_amount,
        start_date: data.start_date !== undefined ? data.start_date : discount.start_date,
        end_date: data.end_date !== undefined ? data.end_date : discount.end_date,
        is_active: data.is_active !== undefined ? data.is_active : discount.is_active
    });

    return discount;

};

const deleteDiscount = async (id) => {

    const discount = await Discount.findByPk(id);

    if (!discount) {
        throw new Error("Discount not found");
    }

    await discount.destroy();

    return { message: "Discount deleted successfully" };

};

module.exports = {
    createDiscount,
    getAllDiscounts,
    getById,
    updateDiscount,
    deleteDiscount
};