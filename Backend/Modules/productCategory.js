const { Model, DataTypes } = require("sequelize");

class ProductCategory extends Model {}

module.exports = (sequelize) => {
  ProductCategory.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "product_category",
      timestamps: false,
    }
  );

  return ProductCategory;
};