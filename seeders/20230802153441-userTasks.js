'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_tasks', [
      {
        userId: 1,
        taskId: 1,
        assignmentDate: new Date('2023-08-05'),
        is_active: true,
        status: 'COMPLETED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        taskId: 2,
        assignmentDate: new Date('2023-08-10'),
        is_active: true,
        status: 'COMPLETED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        taskId: 3,
        assignmentDate: new Date('2023-08-15'),
        is_active: true,
        status: 'COMPLETED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_tasks', null, {});
  },
};
