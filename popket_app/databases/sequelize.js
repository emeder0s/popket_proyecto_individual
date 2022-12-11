const Sequelize = require('sequelize')
const connection = {
    db: () =>{
        return new Sequelize('popket', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        })
    },
    conn: async () => {
        const sequelize = new Sequelize('popket', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        })
       
        await sequelize.authenticate()
        .then(() => {
            console.log("Sequelize DB Connect")
        })
        
        return sequelize;
    },
    disconn: async con => {
        await con.close();
        console.log("Sequelize DB Disconnect");
    }
}


module.exports = connection;