const { Model, DataTypes } = require("sequelize");

class Inventory extends Model {
  static associate(models) {
    Inventory.belongsTo(models.Product, {
      foreignKey: "product_id",
    });
  }
}

module.exports = (sequelize) => {
  Inventory.init(
    {
      inventory_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      cost: DataTypes.DECIMAL(10,2),
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "inventory",
      timestamps: false,
    }
  );

  return Inventory;
};