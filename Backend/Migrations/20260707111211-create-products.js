'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      product_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "suppliers",
          key: "supplier_id",
        },
        onDelete: "SET NULL",
      },
      sku: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      product_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      weight_grams: {
        type: Sequelize.DECIMAL(8,2),
        defaultValue: 0,
      },
      image: Sequelize.STRING(255),
      brand: Sequelize.STRING(100),
      metal: {
        type: Sequelize.ENUM("gold","silver","steel","platinum"),
        defaultValue: "gold",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("products");
  },
};