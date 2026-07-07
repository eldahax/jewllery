'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inventory_transactions", {
      transaction_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "product_id",
        },
        onDelete: "CASCADE",
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM(
          "purchase",
          "sale",
          "adjustment",
          "return"
        ),
        allowNull: false,
      },
      reference_id: Sequelize.INTEGER,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("inventory_transactions");
  },
};