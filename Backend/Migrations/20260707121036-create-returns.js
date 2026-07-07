'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('returns', {

      return_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      sale_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sales',
          key: 'sale_id'
        },
        onDelete: 'CASCADE'
      },

      return_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      createdAt: {
        type: Sequelize.DATE
      },

      updatedAt: {
        type: Sequelize.DATE
      }

    });

  },


  async down(queryInterface) {

    await queryInterface.dropTable('returns');

  }

};