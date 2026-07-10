const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static associate(models) {
    Category.belongsToMany(models.Product, {
      through: models.ProductCategory,
      foreignKey: "category_id",
      otherKey: "product_id",
    });
  }
}

module.exports = (sequelize) => {
  Category.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: DataTypes.STRING(100),
      description: DataTypes.STRING(100)
    },
    {
      sequelize,
      tableName: "categories",
      timestamps: false,
    }
  );

  return Category;
};