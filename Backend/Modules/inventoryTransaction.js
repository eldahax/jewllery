const { Model, DataTypes } = require("sequelize");

class InventoryTransaction extends Model {
  static associate(models) {
    InventoryTransaction.belongsTo(models.Product, {
      foreignKey: "product_id",
    });
  }
}

module.exports = (sequelize) => {
  InventoryTransaction.init(
    {
      transaction_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      type: DataTypes.ENUM(
        "purchase",
        "sale",
        "adjustment",
        "return"
      ),
      reference_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "inventory_transactions",
      timestamps: false,
    }
  );

  return InventoryTransaction;
};