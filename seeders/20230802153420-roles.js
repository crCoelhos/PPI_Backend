'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Funcionário',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Teste',
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
