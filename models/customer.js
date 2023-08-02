'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Customer extends Model {
    static associate(models) {
      // Add any associations with other models here if needed
    }
  }

  Customer.init(
    {
      businessName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cnpj: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      contactName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactCpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      inclusionDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      size: {
        type: DataTypes.ENUM('micro', 'mei', 'medium', 'large'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Customer',
      tableName: 'Customers',
    }
  );

  return Customer;
};
