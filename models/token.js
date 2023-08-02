'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      // define association here
    }
  }

  Token.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: 'Expiration time for the token (in seconds)',
        get() {
          const expirationTime = this.getDataValue('createdAt') + 3600; // 3600 seconds = 1 hour
          return expirationTime;
        }
      }
    },
    {
      sequelize,
      modelName: 'Token',
      tableName: 'Tokens',
      timestamps: false
    }
  );
  
  return Token;
};
