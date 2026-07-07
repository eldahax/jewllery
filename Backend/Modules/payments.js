'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Payment = sequelize.define('Payment', {

        payment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        sale_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        method: {
            type: DataTypes.ENUM(
                'cash',
                'card',
                'bank',
                'store_credit'
            ),
            allowNull: false
        },

        payment_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }

    }, {

        tableName: 'payments',
        timestamps: false

    });


    
    Payment.associate = (models) => {

      
        Payment.belongsTo(models.Sale, {
            foreignKey: 'sale_id',
            as: 'sale',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

    };


    return Payment;
};