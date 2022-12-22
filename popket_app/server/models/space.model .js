const { Sequelize, DataTypes } = require('sequelize');

spaceModel = {
    create: async (sequelize) => {
        const Spaces = sequelize.define("spaces",{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name_space: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fk_id_spacer: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            timestamps: false
        })

        return Spaces
    }
}

module.exports = spaceModel;