    'use strict';
    const { Model, DataTypes } = require('sequelize');

    module.exports = (sequelize, DataTypes) => {
        class User_Task extends Model {
            static associate(models) {
                this.belongsTo(models.User, {
                    foreignKey: 'userId',
                });
                this.belongsTo(models.Task, {
                    foreignKey: 'taskId',
                });
            }
        }

        User_Task.init(
            {
                assignmentDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                is_active: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: true,
                },
                status: {
                    type: DataTypes.ENUM('TO_ESTIMATE', 'WAITING', 'INPROGRESS', 'PAUSED', 'CANCELED', 'COMPLETED', 'OVERDUE'),
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'User_Task',
                tableName: 'user_tasks',
            }
        );

        return User_Task;
    };
