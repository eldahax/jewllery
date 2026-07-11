'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Reminder extends Model {
    static associate(models) {
      Reminder.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }

  Reminder.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    remindAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    reminder_type: {
      type: DataTypes.STRING(50),
      defaultValue: 'manual',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Reminder',
  });

  return Reminder;
};