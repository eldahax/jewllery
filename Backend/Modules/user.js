const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static associate(models) {
    User.belongsToMany(models.Role, {
      through: models.UserRole,
      foreignKey: "user_id",
      otherKey: "role_id",
    });

    User.hasOne(models.Employee, {
      foreignKey: "user_id",
    });

    User.hasOne(models.Customer, {
      foreignKey: "user_id",
    });

    User.hasMany(models.RefreshToken, {
      foreignKey: "user_id",
    });
  }
}

module.exports = (sequelize) => {
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: DataTypes.STRING(100),
      last_name: DataTypes.STRING(100),
      email: DataTypes.STRING(255),
      phone: DataTypes.STRING(20),
      password_hash: DataTypes.STRING(255),
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "users",
      timestamps: false,
    }
  );

  return User;
};