const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserExpertise extends Model {
        static associate(models) { }
    }

    UserExpertise.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            expertiseId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'UserExpertise',
            tableName: 'user_expertise',
        }
    );

    return UserExpertise;
};
