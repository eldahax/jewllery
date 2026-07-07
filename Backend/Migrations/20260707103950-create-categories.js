'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      category_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("categories");
  },
};