const { Model, DataTypes } = require("sequelize");

class RefreshToken extends Model {
  static associate(models) {
    RefreshToken.belongsTo(models.User, {
      foreignKey: "user_id",
    });
  }
}

module.exports = (sequelize) => {
  RefreshToken.init(
    {
      token_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      token: DataTypes.TEXT,
      expires_at: DataTypes.DATE,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "refresh_tokens",
      timestamps: false,
    }
  );

  return RefreshToken;
};