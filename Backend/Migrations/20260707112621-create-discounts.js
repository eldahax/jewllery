'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("discounts", {
      discount_id: {
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
      discount_price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      start_date: Sequelize.DATE,
      end_date: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("discounts");
  },
};