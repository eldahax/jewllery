const { Model, DataTypes } = require("sequelize");

class Role extends Model {
  static associate(models) {
    Role.belongsToMany(models.User, {
      through: models.UserRole,
      foreignKey: "role_id",
      otherKey: "user_id",
    });
  }
}

module.exports = (sequelize) => {
  Role.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_name: DataTypes.STRING(100),
    },
    {
      sequelize,
      tableName: "roles",
      timestamps: false,
    }
  );

  return Role;
};