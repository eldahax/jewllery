'use strict';
const { Model, DataTypes } = require('sequelize'); // Import DataTypes here

module.exports = (sequelize) => { // Only accept sequelize
  class Warranty extends Model {
    static associate(models) {
      Warranty.belongsTo(models.Sale, { foreignKey: 'sale_id' });
    }
  }
  
  Warranty.init({
    warranty_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sale_id: DataTypes.INTEGER,
    start_date: DataTypes.DATEONLY, // Use DATEONLY for simple dates
    end_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Warranty',
    tableName: 'warranties',
    timestamps: false
  });
  
  return Warranty;
};