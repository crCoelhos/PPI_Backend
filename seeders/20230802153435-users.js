'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'João Silva',
        cpf: '12345678901',
        email: 'joao@example.com',
        password: bcrypt.hashSync('admin', 10),
        contact: '1234567890',
        birthdate: new Date('1990-05-15'),
        hireDate: new Date('2022-01-10'),
        roleId: 1, // Assuming a role with ID 1 exists
        is_active: true,
        photo: 'joao.jpg',
        document: 'cpf_joao.pdf',
        sex: 'M',
        expertiseId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Maria Santos',
        cpf: '98765432101',
        email: 'maria@example.com',
        password: bcrypt.hashSync('admin', 10),
        contact: '9876543210',
        birthdate: new Date('1992-08-22'),
        hireDate: new Date('2021-11-05'),
        roleId: 2, // Assuming a role with ID 2 exists
        is_active: true,
        photo: 'maria.jpg',
        document: 'cpf_maria.pdf',
        sex: 'H',
        expertiseId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Carlos Oliveira',
        cpf: '34567890123',
        email: 'carlos@example.com',
        password: bcrypt.hashSync('admin', 10),
        contact: '3456789012',
        birthdate: new Date('1985-12-10'),
        hireDate: new Date('2023-03-20'),
        roleId: 1, // Assuming a role with ID 1 exists
        is_active: true,
        photo: 'carlos.jpg',
        document: 'cpf_carlos.pdf',
        sex: 'M',
        expertiseId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ana Costa',
        cpf: '56789012345',
        email: 'ana@example.com',
        password: bcrypt.hashSync('admin', 10),
        contact: '5678901234',
        birthdate: new Date('1994-02-28'),
        hireDate: new Date('2022-06-15'),
        roleId: 2, // Assuming a role with ID 2 exists
        is_active: true,
        photo: 'ana.jpg',
        document: 'cpf_ana.pdf',
        sex: 'H',
        expertiseId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'teste',
        cpf: '123',
        email: 'pedro@example.com',
        password: bcrypt.hashSync('admin', 10),
        contact: '9012345678',
        birthdate: new Date('1998-11-03'),
        hireDate: new Date('2023-02-10'),
        roleId: 3, // Assuming a role with ID 1 exists
        is_active: true,
        photo: 'pedro.jpg',
        document: 'cpf_pedro.pdf',
        sex: 'M',
        expertiseId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
