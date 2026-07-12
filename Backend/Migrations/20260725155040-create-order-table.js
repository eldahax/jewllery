'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      order_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'user_id' },
        onDelete: 'CASCADE'
      },
      stripe_session_id: { type: Sequelize.STRING, allowNull: true, unique: true },
      stripe_payment_intent_id: { type: Sequelize.STRING, allowNull: true },
      status: {
        type: Sequelize.ENUM('pending', 'paid', 'failed', 'refunded'),
        allowNull: false,
        defaultValue: 'pending'
      },
      total: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      customer_email: { type: Sequelize.STRING, allowNull: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('orders');
  }
};