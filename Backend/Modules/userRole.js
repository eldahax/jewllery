const { Model, DataTypes } = require("sequelize");

class UserRole extends Model {}

module.exports = (sequelize) => {
  UserRole.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "user_roles",
      timestamps: false,
    }
  );

  return UserRole;
};