'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Repair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Repair.init({
    customer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    item_description: DataTypes.TEXT,
    status: DataTypes.STRING,
    cost: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Repair',
  });
  return Repair;
};