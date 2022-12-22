const { Sequelize, DataTypes } = require('sequelize');

addressModel = {
    create: async (sequelize) => {
        const Addresses = sequelize.define("addresss",{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            via_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            via_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            via_number: {
                type: DataTypes.STRING,
                allowNull: true
            },
            additional_address: {
                type: DataTypes.STRING,
                allowNull: true
            },
            locality: {
                type: DataTypes.STRING,
                allowNull: false
            },
            postal_code: {
                type: DataTypes.STRING,
                allowNull: false
            },
            locality: {
                type: DataTypes.STRING,
                allowNull: true
            },
            province: {
                type: DataTypes.STRING,
                allowNull: true
            },
            country: {
                type: DataTypes.STRING,
                allowNull: true
            },
        }, {
            timestamps: false
        })

        return Addresses
    }
}

module.exports = addressModel;