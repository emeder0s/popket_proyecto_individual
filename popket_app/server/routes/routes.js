const router = require("express").Router();
const session = require("../controllers/session.controllers");
const user = require("../controllers/user.controllers");
const space = require("../controllers/space.controllers");
const spacer = require("../controllers/spacer.controllers");

//SESSION
router.post("/login", user.new); //Login
router.post("/logout", user.new); //Logout


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

//SPACES
router.post("/add-space", space.new); //Añade un space
router.post("/update-space", space.edit); //Modifica un space
router.get("/space/:id",space.show); //Elimina un space
router.delete("/delete-space/:id",space.delete )//Borra un space

module.exports = router;
