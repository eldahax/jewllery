const { Category } = require("../Models/index");

const createCategory = async (category_name, description) => {
    return await Category.create({
        category_name,
        description
    });
};

const getAllCategories = async () => {
    return await Category.findAll();
};

const findById = async (id) => {
    const category = await Category.findByPk(id);
    if (!category) throw new Error("Category not found");
    return category;
};

const updateCategory = async (id, data) => {
    const category = await Category.findByPk(id);
    if (!category) throw new Error("Category not found");
    

    await category.update({
        category_name:data.category_name,
        description:data.description
    });
    return category;
};

const deleteCategory = async (id) => {
    const category = await Category.findByPk(id);
    if (!category) throw new Error("Category not found");
    
    await category.destroy();
    return { message: "Category deleted successfully" };
};

module.exports = {
    createCategory,
    getAllCategories,
    findById,
    updateCategory,
    deleteCategory
};