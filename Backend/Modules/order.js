const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static associate(models) {
    Order.belongsTo(models.User, { foreignKey: "user_id" });
    Order.hasMany(models.OrderItem, { foreignKey: "order_id", onDelete: "CASCADE" });
  }
}

module.exports = (sequelize) => {
  Order.init({
    order_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: DataTypes.INTEGER,
    stripe_session_id: { type: DataTypes.STRING, unique: true },
    stripe_payment_intent_id: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM("pending", "paid", "failed", "refunded"),
      defaultValue: "pending"
    },
    total: DataTypes.DECIMAL(10, 2),
    customer_email: DataTypes.STRING,
  }, {
    sequelize,
    tableName: "orders",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Order;
};