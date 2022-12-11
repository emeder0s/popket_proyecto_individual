const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../databases/sequelize');

async function getUsers(){
    const sequelize = await connection.db();
    const Users = sequelize.define('users', {
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
            allowNull: false
        },
        user_password: {
            type: DataTypes.STRING
        },
        fk_id_address: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false
        
    });
  
    return Users;
}

module.exports = getUsers();