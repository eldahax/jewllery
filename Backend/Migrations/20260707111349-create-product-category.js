'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_category", {
      category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "categories",
          key: "category_id",
        },
        onDelete: "CASCADE",
      },
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "products",
          key: "product_id",
        },
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("product_category");
  },
};