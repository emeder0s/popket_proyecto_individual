const { Sequelize, DataTypes } = require('sequelize');

orderModel = {
    create: async (sequelize) => {
        const Orders = sequelize.define("orders",{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            num_order: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            total_account: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            }
        }, {
            timestamps: false
        })

        return Orders
    }
}

module.exports = orderModel;