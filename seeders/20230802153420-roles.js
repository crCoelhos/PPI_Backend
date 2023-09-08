'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'FUNCIONARIO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'TESTE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Adicione mais registros conforme necessário
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
