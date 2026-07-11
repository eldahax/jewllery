const { Model, DataTypes } = require("sequelize");

class WorkSchedule extends Model {
  static associate(models) {
    WorkSchedule.belongsTo(models.User, {
      foreignKey: "user_id",
    });
  }
}

module.exports = (sequelize) => {
  WorkSchedule.init(
    {
      schedule_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      work_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      shift: {
        type: DataTypes.ENUM(
          "Morning",
          "Afternoon",
          "Night"
        ),
      },

      notes: {
        type: DataTypes.STRING(255),
      },

      created_at: DataTypes.DATE,

      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "work_schedules",
      timestamps: false,
    }
  );

  return WorkSchedule;
};