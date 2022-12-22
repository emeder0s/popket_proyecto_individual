const { Sequelize, DataTypes } = require('sequelize');

productModel = {
    create: async (sequelize) => {
        const Products = sequelize.define("products",{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            product_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            price: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fk_id_space: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            timestamps: false
        })

        return Products
    }
}

module.exports = productModel;