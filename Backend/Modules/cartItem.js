const { Model, DataTypes } = require("sequelize");

class CartItem extends Model {
  static associate(models) {
    CartItem.belongsTo(models.Cart, { foreignKey: "cart_id" });
    CartItem.belongsTo(models.Product, { foreignKey: "product_id" });
  }
}

module.exports = (sequelize) => {
  CartItem.init({
    cart_item_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: "cart_items",
    timestamps: false,
  });
  return CartItem;
};