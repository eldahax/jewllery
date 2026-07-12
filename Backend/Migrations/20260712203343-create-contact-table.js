'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contact', {
      contact_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      fullname: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      phone_number: {
        type: Sequelize.STRING(20),
        allowNull: true
      },

      message: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contact');
  }
};