const { Sequelize, DataTypes } = require('sequelize');

orderProductModel = {
    create: async (sequelize) => {
        const OrdersProducts = sequelize.define("orders_products",{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fk_id_product: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            fk_id_order: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            timestamps: false
        })

        return OrdersProducts
    }
}

module.exports = orderProductModel;