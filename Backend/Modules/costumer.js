const { Model, DataTypes } = require("sequelize");

class Customer extends Model {
  static associate(models) {
    Customer.belongsTo(models.User, {
      foreignKey: "user_id",
    });

    Customer.hasMany(models.Sale, {
      foreignKey: "customer_id",
    });

    Customer.hasMany(models.Repair, {
      foreignKey: "customer_id",
    });
  }
}

module.exports = (sequelize) => {
  Customer.init(
    {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "customers",
      timestamps: false,
    }
  );

  return Customer;
};