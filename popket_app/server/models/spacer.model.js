const { Sequelize, DataTypes } = require('sequelize');

spacerModel = {
    create: async (sequelize) => {
        const Spacers = sequelize.define("spacers",{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            spacer_password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fk_id_address: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            timestamps: false
        })

        return Spacers
    }
}

module.exports = spacerModel;