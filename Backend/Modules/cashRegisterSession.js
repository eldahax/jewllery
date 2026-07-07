const { Model, DataTypes } = require("sequelize");

class CashRegisterSession extends Model {
  static associate(models) {
    CashRegisterSession.belongsTo(models.Employee, {
      foreignKey: "employee_id",
    });

    CashRegisterSession.hasMany(models.Sale, {
      foreignKey: "session_id",
    });
  }
}

module.exports = (sequelize) => {
  CashRegisterSession.init(
    {
      session_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_id: DataTypes.INTEGER,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      opening_cash: DataTypes.DECIMAL(10,2),
      closing_cash: DataTypes.DECIMAL(10,2),
    },
    {
      sequelize,
      tableName: "cash_register_sessions",
      timestamps: false,
    }
  );

  return CashRegisterSession;
};