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
      discount_percentage: DataTypes.DECIMAL(5, 2),
      discount_amount: DataTypes.DECIMAL(10, 2),
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "discounts",
      timestamps: false,
    }
  );

  return Discount;
};