const { Model, DataTypes } = require("sequelize");

class Supplier extends Model {
  static associate(models) {
    Supplier.hasMany(models.Product, {
      foreignKey: "supplier_id",
    });

    Supplier.hasMany(models.Purchase, {
      foreignKey: "supplier_id",
    });
  }
}

module.exports = (sequelize) => {
  Supplier.init(
    {
      supplier_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING(100),
      phone: DataTypes.STRING(20),
      email: DataTypes.STRING(255),
      address: DataTypes.STRING(255),
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "suppliers",
      timestamps: false,
    }
  );

  return Supplier;
};