const { Model, DataTypes } = require("sequelize");

class PurchaseItem extends Model {
  static associate(models) {
    PurchaseItem.belongsTo(models.Purchase, {
      foreignKey: "purchase_id",
    });

    PurchaseItem.belongsTo(models.Product, {
      foreignKey: "product_id",
    });
  }
}

module.exports = (sequelize) => {
  PurchaseItem.init(
    {
      purchase_item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      purchase_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      cost: DataTypes.DECIMAL(10,2),
    },
    {
      sequelize,
      tableName: "purchase_items",
      timestamps: false,
    }
  );

  return PurchaseItem;
};