const { Model, DataTypes } = require("sequelize");

class Employee extends Model {
  static associate(models) {
    Employee.belongsTo(models.User, {
      foreignKey: "user_id",
    });
  }
}

module.exports = (sequelize) => {
  Employee.init(
    {
      employee_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "employees",
      timestamps: false,
    }
  );

  return Employee;
};