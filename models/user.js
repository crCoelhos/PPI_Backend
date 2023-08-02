'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.Role, {
        as: 'role',
        foreignKey: 'roleId',
      });

      this.belongsToMany(models.Expertise, {
        through: 'UserExpertises',
        as: 'expertises',
        foreignKey: 'userId',
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hireDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      photo: {  
        type: DataTypes.STRING,
        allowNull: true,
      },
      document: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sex: {
        type: DataTypes.ENUM('M', 'H', 'O'),
        allowNull: false
      },
      expertiseId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Expertises',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    }
  );

  return User;
};
