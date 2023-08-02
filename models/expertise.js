'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Expertise extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                as: 'user',
                foreignKey: 'userId',
              });
            
        }
    }

    Expertise.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: 'Expertise',
            tableName: 'Expertises',
        }
    );

    return Expertise;
};
