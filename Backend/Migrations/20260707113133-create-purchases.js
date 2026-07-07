'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("purchases", {
      purchase_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "suppliers",
          key: "supplier_id",
        },
        onDelete: "CASCADE",
      },
      purchase_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("purchases");
  },
};