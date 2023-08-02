'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Expertises', [
      {
        name: 'Design',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Filmagem',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fotografia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Edição',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Desenvolvimento',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Roteiro',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Consultoria',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Expertises', null, {});
  },
};
