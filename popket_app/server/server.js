const express = require("express");
const router = require("./routes/routes");
const port = 5000;
const app = express();
const cookieParser = require('cookie-parser');
// const multer  = require('multer');

// Middlewares: 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(multer);

// Rutas estáticas
app.use(express.static("./views"));


// Uso de rutas
app.use("/", router);


app.listen(port, () => console.log(`Server ON: ${port}`));