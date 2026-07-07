const { Model, DataTypes } = require("sequelize");

class Return extends Model {
  static associate(models) {
    Return.belongsTo(models.Sale, {
      foreignKey: "sale_id",
    });

    Return.hasMany(models.ReturnItem, {
      foreignKey: "return_id",
    });
  }
}

module.exports = (sequelize) => {
  Return.init(
    {
      return_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sale_id: DataTypes.INTEGER,
      return_date: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "returns",
      timestamps: false,
    }
  );

  return Return;
};