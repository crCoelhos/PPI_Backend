'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contractDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      contractDocument: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      deadline: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      updatedDeadline: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      taskDomain: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      taskStatus: {
        type: Sequelize.ENUM('TO_ESTIMATE', 'WAITING', 'INPROGRESS', 'PAUSED', 'CANCELED', 'COMPLETED', 'OVERDUE'),
        allowNull: false,
        defaultValue: 'TO_ESTIMATE',
      }, 
      completedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      estimateValue: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tasks');
  }
};
