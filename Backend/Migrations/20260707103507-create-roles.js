'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roles", {
      role_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("roles");
  },
};