const { Favorite, Product } = require("../Models/index");

const createFavorite = async (user_id, product_id) => {
    const [favorite] = await Favorite.findOrCreate({
        where: { user_id, product_id }
    });
    return favorite;
};

const getAllFavorites = async (user_id) => {
    return await Favorite.findAll({
        where: { user_id },
        include: [{
            model: Product,
            attributes: ["product_name","price","image"]
        }]
    });
};

const findById = async (id) => {
    const favorite = await Favorite.findByPk(id);
    if (!favorite) throw new Error("Favorite not found");
    return favorite;
};

const deleteFavorite = async (id) => {
    const favorite = await Favorite.findByPk(id);
    if (!favorite) throw new Error("Favorite not found");

    await favorite.destroy();
    return { message: "Favorite deleted successfully" };
};

const toggleFavorite = async (user_id, product_id) => {
    const favorite = await Favorite.findOne({ where: { user_id, product_id } });

    if (favorite) {
        await favorite.destroy();
        return { favorited: false };
    }

    await Favorite.create({ user_id, product_id });
    return { favorited: true };
};

module.exports = {
    createFavorite,
    getAllFavorites,
    findById,
    deleteFavorite,
    toggleFavorite
};