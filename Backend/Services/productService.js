const { Product, Category, ProductCategory, Inventory, Discount, sequelize } = require("../Models/index");

const categoryInclude = {
    model: Category,
    as: "Categories",
    attributes: [
        "category_id",
        "category_name"
    ],
    through: {
        attributes: []
    }
};

const discountInclude = {
    model: Discount
};

const createProduct = async (data) => {

    return await sequelize.transaction(async (t) => {

        const category = await Category.findByPk(data.category_id, {
            transaction: t
        });

        if (!category) {
            throw new Error("Category not found");
        }


        const product = await Product.create(
            {
                supplier_id: data.supplier_id,
                product_name: data.product_name,
                sku: data.sku,
                price: data.price,
                weight_grams: data.weight_grams,
                brand: data.brand,
                metal: data.metal,
                image: data.image
            },
            {
                transaction: t
            }
        );


        await ProductCategory.create(
            {
                product_id: product.product_id,
                category_id: category.category_id
            },
            {
                transaction: t
            }
        );

        await Inventory.create({
            product_id: product.product_id,
            stock: data.stock
        }, {
            transaction: t
        });

        return await Product.findByPk(product.product_id, {
            include: [categoryInclude],
            transaction: t
        });
    });
};

const getAllProducts = async () => {
    const products = await Product.findAll({
        include: [
            {
                association: "Categories",
                through: {
                    attributes: []
                }
            },
            {
                model: Inventory,
                attributes: ["stock"]
            },
            discountInclude
        ]
    });
    return products;
};

const getById = async (id) => {

    const product = await Product.findByPk(id, {
        include: [
            categoryInclude,
            {
                model: Inventory,
                attributes: ["stock"]
            },
            discountInclude
        ]
    });


    if (!product) {
        throw new Error("Product not found");
    }


    return product;

};



const updateProduct = async (id, data) => {

    return await sequelize.transaction(async (t) => {


        const product = await Product.findByPk(id, {
            transaction: t
        });


        if (!product) {
            throw new Error("Product not found");
        }



        await product.update(
            {
                supplier_id: data.supplier_id,
                product_name: data.product_name,
                sku: data.sku,
                price: data.price,
                weight_grams: data.weight_grams,
                brand: data.brand,
                metal: data.metal,
                image: data.image || product.image
            },
            {
                transaction: t
            }
        );



        if (data.category_id) {


            const category = await Category.findByPk(
                data.category_id,
                {
                    transaction: t
                }
            );


            if (!category) {
                throw new Error("Category not found");
            }



            await ProductCategory.destroy({
                where: {
                    product_id: id
                },
                transaction: t
            });



            await ProductCategory.create(
                {
                    product_id: id,
                    category_id: data.category_id
                },
                {
                    transaction: t
                }
            );

        }

        const invent = await Inventory.findOne({
            where: {
                product_id: id
            },
            transaction: t
        });

        if (data.stock !== undefined) {

            if (invent) {

                await invent.update({
                    stock: data.stock
                }, {
                    transaction: t
                });

            } else {

                await Inventory.create({
                    product_id: id,
                    stock: data.stock
                }, {
                    transaction: t
                });

            }

        }
        return await Product.findByPk(id, {
            include: [categoryInclude],
            transaction: t
        });

    });

};




const deleteProduct = async (id) => {

    return await sequelize.transaction(async (t) => {


        const product = await Product.findByPk(id, {
            transaction: t
        });



        if (!product) {
            throw new Error("Product not found");
        }
        await Inventory.destroy({
            where: {
                product_id: product.product_id
            },
            transaction: t
        });



        await ProductCategory.destroy({
            where: {
                product_id: id
            },
            transaction: t
        });



        await product.destroy({
            transaction: t
        });




        return {
            message: "Product deleted successfully"
        };

    });

};



module.exports = {
    createProduct,
    getAllProducts,
    getById,
    updateProduct,
    deleteProduct
};