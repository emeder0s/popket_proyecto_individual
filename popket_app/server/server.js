const express = require("express");
const router = require("./routes/routes");
const port = 5000;
const app = express();
const cookieParser = require('cookie-parser');
const multer  = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir(`./uploads/${req.headers.id_space}`,(err) => {
            if (err) {
              console.error(err);
            } 
          });
        cb(null, `./uploads/${req.headers.id_space}`);
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });


// Middlewares: 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Uso de rutas
app.use("/", router);
app.post("/upload-image", upload.single("file"), (req, res) => {
    res.json({
        status:true,
        path: req.file.filename
    });
});
app.get('/uploads/:id_space/:file', (req, res) => {
    res.sendFile(`${__dirname}/uploads/${req.params.id_space}/${req.params.file}`);
  });

app.listen(port, () => console.log(`Server ON: ${port}`));