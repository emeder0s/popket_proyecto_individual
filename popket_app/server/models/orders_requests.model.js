const { Sequelize, DataTypes } = require('sequelize');

ordersRequestsModel = {
    create: async (sequelize) => {
        const ordersRequests = sequelize.define("orders_request",{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fk_id_order: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            fk_id_space: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        }, {
            timestamps: false
        })

        return ordersRequests
    }
}

module.exports = ordersRequestsModel;