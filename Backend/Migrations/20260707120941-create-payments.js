'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('payments', {

      payment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      sale_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'sales',
          key: 'sale_id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      amount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },

      method: {
        type: Sequelize.ENUM(
          'cash',
          'card',
          'bank',
          'store_credit'
        ),
        allowNull: false
      },

      payment_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }

    });

  },


  async down(queryInterface) {

    await queryInterface.dropTable('payments');

  }

};