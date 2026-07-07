const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static associate(models) {
    Product.belongsTo(models.Supplier, {
      foreignKey: "supplier_id",
    });

    Product.belongsToMany(models.Category, {
      through: models.ProductCategory,
      foreignKey: "product_id",
      otherKey: "category_id",
    });

    Product.belongsToMany(models.Collection, {
      through: models.CollectionItem,
      foreignKey: "product_id",
      otherKey: "collection_id",
    });

    Product.hasOne(models.Inventory, {
      foreignKey: "product_id",
    });

    Product.hasMany(models.Discount, {
      foreignKey: "product_id",
    });

    Product.hasMany(models.SaleItem, {
      foreignKey: "product_id",
    });
  }
}

module.exports = (sequelize) => {
  Product.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      supplier_id: DataTypes.INTEGER,
      sku: DataTypes.STRING(100),
      product_name: DataTypes.STRING(100),
      price: DataTypes.DECIMAL(10,2),
      weight_grams: DataTypes.DECIMAL(8,2),
      image: DataTypes.STRING(255),
      brand: DataTypes.STRING(100),
      metal: DataTypes.ENUM("gold","silver","steel","platinum"),
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "products",
      timestamps: false,
    }
  );

  return Product;
};