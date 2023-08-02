'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Customers', [
      {
        businessName: 'Empresa A',
        cnpj: '12345678901234',
        contactName: 'João Silva',
        contactCpf: '98765432198',
        isActive: true,
        size: 'pequena empresa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessName: 'Empresa B',
        cnpj: '56789012345678',
        contactName: 'Maria Santos',
        contactCpf: '12345678901',
        isActive: true,
        size: 'média empresa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Customers', null, {});
  },
};
