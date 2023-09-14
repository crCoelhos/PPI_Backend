'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tasks', [

      {
        name: 'Mobile App Design',
        description: 'Design a user-friendly mobile app.',
        contractDate: new Date(),
        contractDocument: null,
        startDate: new Date(),
        deadline: new Date(),
        updatedDeadline: null,
        taskDomain: '5',
        isActive: true,
        taskStatus: "TO_ESTIMATE",
        customerId: 1, // Assuming a customer with ID 2 exists
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Wedding Photos',
        description: 'Capture beautiful moments at a wedding.',
        contractDate: new Date(),
        contractDocument: null,
        startDate: new Date(),
        deadline: new Date(),
        updatedDeadline: null,
        taskDomain: '2',
        isActive: true,
        taskStatus: "TO_ESTIMATE",
        customerId: 2, // Assuming a customer with ID 3 exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pharmacy Commercial',
        description: 'Produce a commercial for a pharmacy.',
        contractDate: new Date(),
        contractDocument: null,
        startDate: new Date(),
        deadline: new Date(),
        updatedDeadline: null,
        taskDomain: '3',
        isActive: true,
        taskStatus: "OVERDUE",
        customerId: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Adicione mais registros conforme necessário
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
