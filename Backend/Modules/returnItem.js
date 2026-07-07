'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const ReturnItem = sequelize.define('ReturnItem', {

        return_item_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        return_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {

        tableName: 'return_items',
        timestamps: false

    });


  
    ReturnItem.associate = (models) => {

     
        ReturnItem.belongsTo(models.Return, {
            foreignKey: 'return_id',
            as: 'return',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });


        
        ReturnItem.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'product',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

    };


    return ReturnItem;
};