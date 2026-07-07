'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("collection_items", {
      collection_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "collections",
          key: "collection_id",
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
    await queryInterface.dropTable("collection_items");
  },
};