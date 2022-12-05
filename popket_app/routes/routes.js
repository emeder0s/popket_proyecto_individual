const page = require("../controllers/page.controllers");
const user = require("../controllers/user.controllers");
const spacer = require("../controllers/spacer.controllers");

//PAGES
router.get("/", page.home); //página de inicio

//USER
router.post("/registro", user.register); //Registro de usuarios

//USER
router.post("/registro-spacer", spacer.register); //Registro de spacers
