const { Sequelize, DataTypes } = require('sequelize');

UserSpacerOrderModel = {
    create: async (sequelize) => {
        const UsersSpacersOrders = sequelize.define("users_spacers_orders",{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            id_user_spacer: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            fk_id_order: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            name_table: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            timestamps: false
        })

        return UsersSpacersOrders
    }
}

module.exports = UserSpacerOrderModel;