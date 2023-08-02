'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Role extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'roleId', 
        as: 'users',
      });
    }
  }

  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'Roles',
    }
  );

  return Role;
};
