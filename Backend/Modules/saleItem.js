const { Model, DataTypes } = require("sequelize");

class SaleItem extends Model {
  static associate(models) {
    SaleItem.belongsTo(models.Sale, {
      foreignKey: "sale_id",
    });

    SaleItem.belongsTo(models.Product, {
      foreignKey: "product_id",
    });
  }
}

module.exports = (sequelize) => {
  SaleItem.init(
    {
      sale_item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sale_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(10,2),
    },
    {
      sequelize,
      tableName: "sale_items",
      timestamps: false,
    }
  );

  return SaleItem;
};