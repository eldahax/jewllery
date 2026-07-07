'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inventory", {
      inventory_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "products",
          key: "product_id",
        },
        onDelete: "CASCADE",
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      cost: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("inventory");
  },
};