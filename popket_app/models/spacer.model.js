const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../databases/sequalize');


// const Spacers = sequelize.define('spacers', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     first_name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     last_name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false
//     },
//     phone: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     spacer_password: {
//         type: DataTypes.STRING
//     },
//     fk_id_address: {
//         type: DataTypes.INTEGER
//     },
//     fk_id_space: {
//         type: DataTypes.INTEGER
//     }
// }, {
//     timestamps: false
    
// });
// module.exports = Spacers;