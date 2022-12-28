const router = require("express").Router();
const session = require("../controllers/session.controllers");
const user = require("../controllers/user.controllers");
const spacer = require("../controllers/spacer.controllers");
const address = require("../controllers/address.controllers");
const space = require("../controllers/space.controllers");

//SESSION
router.post("/login", session.login); //Login
router.get("/logout", session.logout); //Logout

//USER
router.post("/register", user.new); //Añade un user
router.post("/edit-user", user.edit); //Modifica un user
router.get("/user/:id",user.show); //Elimina un user
router.delete("/delete-user/:id",user.delete );//Borra un user

//SPACER
router.post("/register-spacer", spacer.new); //Añade un spacer
router.post("/edit-spacer", spacer.edit); //Modifica un spacer
router.get("/spacer/:id",spacer.show); //Elimina un spacer
router.delete("/delete-spacer/:id",spacer.delete )//Borra un spacer

//ADDRESS
router.post("/new-address", address.new); //Añade una dirección
router.post("/edit-address", address.edit); //Modifica una dirección
router.get("/address/:id",address.show); //Elimina una dirección
router.delete("/delete-address/:id",address.delete )//Borra una dirección

//SPACES
router.post("/add-space", space.new); //Añade un space
router.post("/update-space", space.edit); //Modifica un space
router.get("/space/:id",space.show); //Elimina un space
router.delete("/delete-space/:id",space.delete )//Borra un space

module.exports = router;
