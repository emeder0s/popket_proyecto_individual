const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
let favoriteSchema= new Schema({
    fk_id_user: String,
    fk_id_product: String,
});
 
const favoriteModel = mongoose.model("favorites", favoriteSchema);
module.exports = favoriteModel;