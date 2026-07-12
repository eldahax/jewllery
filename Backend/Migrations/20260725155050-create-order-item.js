'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_items', {
      order_item_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'orders', key: 'order_id' },
        onDelete: 'CASCADE'
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'product_id' },
        onDelete: 'CASCADE'
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      price_at_purchase: { type: Sequelize.DECIMAL(10, 2), allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('order_items');
  }
};