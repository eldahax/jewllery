'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  class Reviews extends Model {

    static associate(models) {

      Reviews.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });

    }

  }


  Reviews.init({

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },


    product_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },


    stars:{
      type: DataTypes.INTEGER,
      allowNull:false
    },


    note:{
      type: DataTypes.STRING,
      allowNull:false
    },


    createdAt: {
      allowNull:false,
      type:DataTypes.DATE,
     
    },


    updatedAt:{
      allowNull:true,
      type:DataTypes.DATE,
    
    }


  }, {

    sequelize,
    tableName:'reviews',
    timestamps:true

  });


  return Reviews;
};