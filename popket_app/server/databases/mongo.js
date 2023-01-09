const connection = {
    conn: async () => {
        const mongoose = require("mongoose");
        const url = "mongodb://127.0.0.1:27017/popket";
        console.log("DB Connect");
        return await mongoose.connect(url);
    },
    disconn: async con => {
        await con.disconnect();
        console.log("DB Disconnect");
    }
}


module.exports = connection;