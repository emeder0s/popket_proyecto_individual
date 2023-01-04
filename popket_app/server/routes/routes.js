const router = require("express").Router();
const session = require("../controllers/session.controllers");
const user = require("../controllers/user.controllers");
const spacer = require("../controllers/spacer.controllers");
const address = require("../controllers/address.controllers");
const space = require("../controllers/space.controllers");
const product = require("../controllers/product.controllers");
const order = require("../controllers/order.controllers");
const usersSpacersOrder = require("../controllers/users_spacers_orders.controllers");
// const multer  = require('multer');
// const upload = multer({ dest: './uploads/' });

//SESSION
router.post("/login", session.login); //Login
router.get("/logout", session.logout); //Logout

//USER
router.post("/register", user.new); //Añade un user
router.post("/edit-user", user.edit); //Modifica un user
router.post("/edit-user-password", user.editPassword); //Modifica la contrañsea de un usuario
router.get("/user/:id",user.show); //Elimina un user
router.delete("/delete-user/:id",user.delete );//Borra un user

//SPACER
router.post("/register-spacer", spacer.new); //Añade un spacer
router.post("/edit-spacer", spacer.edit); //Modifica un spacer
router.post("/edit-spacer-password", spacer.editPassword); //Modifica la contrañsea de un spacer
router.get("/spacer/:id",spacer.show); //Muestra un spacer
router.delete("/delete-spacer/:id",spacer.delete )//Borra un spacer
router.get("/is-spacer",spacer.isSpacer); //Devuelve si es spacer

//ADDRESS
router.post("/new-address-for-user", address.newForUser); //Añade una dirección de un usuario
router.post("/new-address-for-user", address.newForSpacer); //Añade una dirección de un spacer
router.post("/edit-address", address.edit); //Modifica una dirección
router.get("/address/:id",address.show); //Elimina una dirección
router.delete("/delete-address/:id",address.delete);//Borra una dirección
router.get("/get-address-by-spacer/:id",address.getBySpacer);//Devuelve la dirección del spacer
router.get("/get-address-by-user/:id",address.getByUser);//Devuelve la dirección del usuario

//SPACES
router.post("/add-space", space.new); //Añade un space
router.post("/edit-space", space.edit); //Modifica un space
router.get("/show/:id",space.show); //Elimina un space
router.delete("/delete-space/:id",space.delete )//Borra un space
router.get("/get-space-by-user",space.getByUser)//Devuelve el id del space
router.get("/show-space-by-spacer",space.showBySpacer)//Devuelve los datos de un space

//PRODUCTS
// router.post("/new-product", upload.single("image"), product.new); //Añade un space
router.post("/edit-product", product.edit); //Modifica un space
router.get("/product/:id",product.show); //Elimina un space
router.delete("/delete-product/:id",product.delete )//Borra un space

//ORDERS
router.post("/new-order", order.new); //Añade un space
router.post("/edit-order", order.edit); //Modifica un space
router.get("/order/:id",order.show); //Elimina un space
router.delete("/delete-order/:id",order.delete )//Borra un space
router.get("/orders/:name_table/:id_user_spacer",order.getOrders)//Devuelve los orders de un usuario

module.exports = router;
