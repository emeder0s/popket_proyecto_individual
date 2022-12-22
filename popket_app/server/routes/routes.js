const router = require("express").Router();
// const page = require("../controllers/page.controllers");
const user = require("../controllers/user.controllers");
// const spacer = require("../controllers/spacer.controllers");

//PAGES
// router.get("/", page.home); //página de inicio

//USER
router.post("/sigin", user.sigin); //Registro de usuarios

//USER
// router.post("/sigin-spacer", spacer.sigin); //Registro de spacers

module.exports = router;
