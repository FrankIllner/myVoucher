const express = require('express');
const multer = require('multer');


const app = express();

const fileFilter = function(req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png"];
    
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Flascher Bild Type");
        error.code = "LIMIT_FILE_TYPES";
        return cb(error, false);
    }

    cb(null, true);
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images/')
    },
    filename: function (req, file, cb) {
        var d = new Date();
        var tag = d.getDate();
        var monat = d.getMonth() + 1;
        var jahr = d.getFullYear();
        var stunde = d.getHours();
        let currrentDate = tag+monat+jahr+stunde;
        cb(null, currrentDate + '-' + file.originalname );
    }
  });
const MAX_SIZE = 200000;
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: MAX_SIZE
    }

})

app.post("/upload", upload.single('file'), (req, res) => {
    res.json({file: req.file});
});

app.post("/multiple", upload.array('files'), (req, res) => {
    res.json({files: req.files});
});



app.use(function(err, req, res, next) {
    if (err.code === "LIMIT_FILE_TYPES") {
        res.status(422).json({ error: "Nur Bilder erlaubt"});
        return;
    }

    if (err.code === "LIMIT_FILE_SIZE") {
        res.status(422).json({ error: 'zu Groß. Max Größe sind ${MAX_SIZE/1000}Kb'});
        return;
    }


});

app.listen(3344, () => console.log("Port: 3344"));