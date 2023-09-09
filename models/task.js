'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.hasMany(models.User, {
        as: 'user',
        foreignKey: 'id',
      });

      this.hasMany(models.User_Task, {
        as: 'usertask',
        foreignKey: 'taskId',
      });

      this.belongsTo(models.Customer, {
        as: 'customer',
        foreignKey: 'customerId',
      });

      this.belongsTo(models.Expertise, {
        foreignKey: 'taskDomain', 
        as: 'expertise',
      });
    }
  }

  Task.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contractDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      contractDocument: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      updatedDeadline: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      taskDomain: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Expertises',
          key: 'id',
        },
      },
      taskStatus: {
        type: DataTypes.ENUM('TODO', 'WAITING', 'INPROGRESS', 'PAUSED', 'CANCELED', 'COMPLETED', 'OVERDUE'),
        allowNull: false,
        defaultValue: 'TODO',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
    }
  );

  return Task;
};
