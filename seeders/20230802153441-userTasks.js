'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_tasks', [
      {
        userId: 1, // Assuming a user with ID 1 exists
        taskId: 1, // Assuming a task with ID 1 exists
        assignmentDate: new Date('2023-08-05'),
        is_active: true,
        status: 'WAITING',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2, // Assuming a user with ID 2 exists
        taskId: 2, // Assuming a task with ID 2 exists
        assignmentDate: new Date('2023-08-10'),
        is_active: true,
        status: 'TO_ESTIMATE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1, // Assuming a user with ID 3 exists
        taskId: 3, // Assuming a task with ID 3 exists
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
