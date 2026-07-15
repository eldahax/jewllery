const productService = require("../Services/productService");
const { Product } = require("../Models/index");
const create = async (req, res) => {
    try {
   
        const { supplier_id, sku, product_name, price, weight_grams, brand, metal, category_id ,stock} = req.body;
        const image = req.file ? req.file.filename : null;

        const product = await productService.createProduct({
            supplier_id, sku, product_name, price, weight_grams, image, brand, metal, category_id,stock
        });

        res.json(product);
    } catch (err) {
      
        res.status(500).json({ error: err.message });
    }
};
const getAll = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

const findByPk = async (req, res) => {
    try {
        const product = await productService.getById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

const deleteP = async (req, res) => {
    try {
        const result = await productService.deleteProduct(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

const update = async (req, res) => {
    try {

        const updateData = {
            ...req.body
        };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const product = await productService.updateProduct(
            req.params.id,
            updateData
        );

        res.json(product);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

module.exports = {
    create,
    getAll,
    findByPk,
    deleteP,
    update
};