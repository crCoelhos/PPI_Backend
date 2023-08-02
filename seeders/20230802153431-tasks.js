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
        taskDomain: 'Desenvolvimento',
        isActive: true,
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
        taskDomain: 'Fotografia',
        isActive: true,
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
        taskDomain: 'Filmagem',
        isActive: true,
        customerId: 1, // Assuming a customer with ID 4 exists
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
