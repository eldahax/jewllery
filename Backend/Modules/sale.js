const { Model, DataTypes } = require("sequelize");

class Sale extends Model {
  static associate(models) {
    Sale.belongsTo(models.Customer, { foreignKey: "customer_id" });
    Sale.belongsTo(models.Employee, { foreignKey: "employee_id" });
    Sale.belongsTo(models.CashRegisterSession, { foreignKey: "session_id" });

    Sale.hasMany(models.SaleItem, {
      foreignKey: "sale_id",
    });

    Sale.hasMany(models.Payment, {
      foreignKey: "sale_id",
    });

    Sale.hasMany(models.Return, {
      foreignKey: "sale_id",
    });

    Sale.hasOne(models.Warranty, {
      foreignKey: "sale_id",
    });
  }
}

module.exports = (sequelize) => {
  Sale.init(
    {
      sale_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_id: DataTypes.INTEGER,
      employee_id: DataTypes.INTEGER,
      session_id: DataTypes.INTEGER,
      sale_date: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "sales",
      timestamps: false,
    }
  );

  return Sale;
};