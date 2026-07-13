'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('work_schedules', {

      schedule_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'users',
          key: 'user_id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      work_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      start_time: {
        type: Sequelize.TIME,
        allowNull: false
      },

      end_time: {
        type: Sequelize.TIME,
        allowNull: false
      },

      shift: {
        type: Sequelize.ENUM(
          'Morning',
          'Afternoon',
          'Night'
        ),
        allowNull: true
      },

      notes: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: true
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }

    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('work_schedules');
  }
};