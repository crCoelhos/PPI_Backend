'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
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
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      hireDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      document: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sex: {
        type: Sequelize.ENUM('M', 'H', 'O'),
        allowNull: false,
      },
      expertiseId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Expertises',
          key: 'id',
        },
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
    await queryInterface.dropTable('Users');
  },
};
