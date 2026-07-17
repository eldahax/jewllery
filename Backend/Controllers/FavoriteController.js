const favoriteService = require("../Services/FavoriteService");

const create = async (req, res) => {
    try {
        const { product_id } = req.body;
        const cr = await favoriteService.createFavorite(req.user.user_id, product_id);
        res.json(cr);
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

const getAll = async (req, res) => {
    try {
        const get = await favoriteService.getAllFavorites(req.user.user_id);
        res.json(get);
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

const deleteC = async (req, res) => {
    try {
        const del = await favoriteService.deleteFavorite(req.params.id);
        res.json(del);
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

const findByPk = async (req, res) => {
    try {
        const pk = await favoriteService.findById(req.params.id);
        res.json(pk);
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

const toggle = async (req, res) => {
    try {
        const { product_id } = req.body;
        const tg = await favoriteService.toggleFavorite(req.user.user_id, product_id);
        res.json(tg);
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports = {
    create,
    getAll,
    deleteC,
    findByPk,
    toggle
}