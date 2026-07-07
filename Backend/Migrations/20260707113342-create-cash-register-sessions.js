'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cash_register_sessions", {
      session_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "employees",
          key: "employee_id",
        },
      },
      start_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      end_time: Sequelize.DATE,
      opening_cash: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      closing_cash: Sequelize.DECIMAL(10,2),
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("cash_register_sessions");
  },
};