const router = require("express").Router();
// const page = require("../controllers/page.controllers");
const user = require("../controllers/user.controllers");
const space = require("../controllers/space.controllers");
// const spacer = require("../controllers/spacer.controllers");

//USER
// router.post("/sigin", user.sigin); //Registro de usuarios

//SPACES
router.post("/add-space", space.add); //Añade un space
router.post("/update-space", space.update); //Modifica un space
router.get("/space/:id",space.show); //Elimina un space
router.delete("delete-space/:id",space.delete )

module.exports = router;
