const connection = {
    conn: async () => {
        const mongoose = require("mongoose");
        const url = "mongodb://localhost:27017/popket";
        console.log("DB Connect");
        return await mongoose.connect(url);
    },
    disconn: async con => {
        await con.disconnect();
        console.log("DB Disconnect");
    }
}


module.exports = connection;