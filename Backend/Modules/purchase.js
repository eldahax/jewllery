const { Model, DataTypes } = require("sequelize");

class Purchase extends Model {
  static associate(models) {
    Purchase.belongsTo(models.Supplier, {
      foreignKey: "supplier_id",
    });

    Purchase.hasMany(models.PurchaseItem, {
      foreignKey: "purchase_id",
    });
  }
}

module.exports = (sequelize) => {
  Purchase.init(
    {
      purchase_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      supplier_id: DataTypes.INTEGER,
      purchase_date: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "purchases",
      timestamps: false,
    }
  );

  return Purchase;
};