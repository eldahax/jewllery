'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('return_items', {

      return_item_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },


      return_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'returns',
          key: 'return_id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },


      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'products',
          key: 'product_id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },


      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },


      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },


      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }

    });

  },


  async down(queryInterface) {

    await queryInterface.dropTable('return_items');

  }

};