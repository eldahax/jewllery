'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Add is_sent column
    await queryInterface.addColumn('Reminders', 'is_sent', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    });

    // 2. Add reminder_type column
    await queryInterface.addColumn('Reminders', 'reminder_type', {
      type: Sequelize.STRING(50),
      defaultValue: 'manual',
      allowNull: false
    });

    // 3. Add composite index for fast cron job querying
    await queryInterface.addIndex('Reminders', ['is_sent', 'remindAt'], {
      name: 'reminders_is_sent_remindAt_idx'
    });
  },

  async down (queryInterface, Sequelize) {
    // Revert changes in reverse order
    await queryInterface.removeIndex('Reminders', 'reminders_is_sent_remindAt_idx');
    await queryInterface.removeColumn('Reminders', 'reminder_type');
    await queryInterface.removeColumn('Reminders', 'is_sent');
  }
};