const { Model, DataTypes } = require("sequelize");

class Discount extends Model {
  static associate(models) {
    Discount.belongsTo(models.Product, {
      foreignKey: "product_id",
    });
  }
}

module.exports = (sequelize) => {
  Discount.init(
    {
      discount_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: DataTypes.INTEGER,
      discount_price: DataTypes.DECIMAL(10,2),
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "discounts",
      timestamps: false,
    }
  );

  return Discount;
};