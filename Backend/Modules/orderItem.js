const { Model, DataTypes } = require("sequelize");

class OrderItem extends Model {
  static associate(models) {
    OrderItem.belongsTo(models.Order, { foreignKey: "order_id" });
    OrderItem.belongsTo(models.Product, { foreignKey: "product_id" });
  }
}

module.exports = (sequelize) => {
  OrderItem.init({
    order_item_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price_at_purchase: DataTypes.DECIMAL(10, 2),
  }, {
    sequelize,
    tableName: "order_items",
    timestamps: false,
  });
  return OrderItem;
};