'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("suppliers", {
      supplier_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phone: Sequelize.STRING(20),
      email: Sequelize.STRING(255),
      address: Sequelize.STRING(255),
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("suppliers");
  },
};