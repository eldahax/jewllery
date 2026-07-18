const { Product, Review, User } = require("../Models/index");

const isStaff = (roles = []) => roles.includes("admin") || roles.includes("manager");


const createReview = async (product_id, stars, notes, user_id) => {
    const product = await Product.findByPk(product_id);
    if (!product) throw new Error("Product doesn't exist");

    return await Review.create({
        product_id,
        stars,
        note: notes,
        user_id,
    });
};

const getAllReviews = async () => {
    return await Review.findAll({
        attributes: ["id", "stars", "note"],
        include: [
            { model: Product, attributes: ["product_name"] }
        ],
    });
};

const getById = async (product_id) => {
    const reviews = await Review.findAll({ where: { product_id } });
    if (reviews.length === 0) throw new Error("This product has no reviews");
    return reviews;
};

const deleteReview = async (id, currentUser) => {
    const review = await Review.findByPk(id);
    if (!review) throw new Error("This review doesn't exist");

    const roles = currentUser?.roles || [];

    if (!isStaff(roles) && review.user_id !== currentUser?.user_id) {
        throw new Error("Unauthorized: this review doesn't belong to you");
    }

    await review.destroy();
    return { message: "Review deleted successfully" };
};

module.exports = {
    createReview,
    getAllReviews,
    getById,
    deleteReview,
};