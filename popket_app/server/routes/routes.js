const router = require("express").Router();
// const page = require("../controllers/page.controllers");
const user = require("../controllers/user.controllers");
const space = require("../controllers/space.controllers");
const spacer = require("../controllers/spacer.controllers");

//USER
router.post("/register", user.new); //Añade un user
router.post("/edit-user", user.edit); //Modifica un user
router.get("/user/:id",user.show); //Elimina un user
router.delete("/delete-user/:id",user.delete );//Borra un user
router.post("/user-login", user.login);//Login de usuario
router.post("/user-logout", user.logout);//Logout de usuario
router.get("/get-id-from-cookie",user.get_id_from_cookie);//Devuelve el id del usuario registrado

//SPACER
router.post("/register-spacer", spacer.new); //Añade un spacer
router.post("/edit-spacer", spacer.edit); //Modifica un spacer
router.get("/spacer/:id",spacer.show); //Elimina un spacer
router.delete("/delete-spacer/:id",spacer.delete )//Borra un spacer
router.post("/spacer-login", spacer.login);//Login de spacer
router.post("/spacer-logout", spacer.logout);//Logout de spacer
router.get("/get-spacer-id-from-cookie",spacer.get_id_from_cookie);//Devuelve el id del spacer registrado

//SPACES
router.post("/add-space", space.new); //Añade un space
router.post("/update-space", space.edit); //Modifica un space
router.get("/space/:id",space.show); //Elimina un space
router.delete("/delete-space/:id",space.delete )//Borra un space

module.exports = router;
