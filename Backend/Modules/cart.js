const { Model, DataTypes } = require("sequelize");

class Cart extends Model {
  static associate(models) {
    Cart.belongsTo(models.User, { foreignKey: "user_id" });
    Cart.hasMany(models.CartItem, { foreignKey: "cart_id", onDelete: "CASCADE" });
  }
}

module.exports = (sequelize) => {
  Cart.init({
    cart_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: "carts",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Cart;
};