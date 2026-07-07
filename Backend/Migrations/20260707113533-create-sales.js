'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sales", {
      sale_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "customers",
          key: "customer_id",
        },
        onDelete: "SET NULL",
      },
      employee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "employees",
          key: "employee_id",
        },
        onDelete: "SET NULL",
      },
      session_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "cash_register_sessions",
          key: "session_id",
        },
        onDelete: "SET NULL",
      },
      sale_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("sales");
  },
};