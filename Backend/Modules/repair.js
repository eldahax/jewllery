'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Repair extends Model {
    static associate(models) {
      Repair.belongsTo(models.Customer, { foreignKey: 'customer_id' });
      Repair.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }

  Repair.init({
    repair_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: DataTypes.INTEGER,
    item_description: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('received', 'in_progress', 'done', 'picked_up'),
      defaultValue: 'received'
    },
    cost: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    tableName: 'repairs',
    timestamps: false
  });

  return Repair;
};