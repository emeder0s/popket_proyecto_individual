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
            order_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            total_account: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false
            }

        }, {
            timestamps: false
        })

        return Orders
    }
}

module.exports = orderModel;