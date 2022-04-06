const express = require('express');
const multer = require('multer');

const app = express();

const upload = multer({
    dest: './images/'
})

app.post("/upload", upload.single('file'), (req, res) => {
    res.json({file: req.file});
});

app.listen(3344, () => console.log("Port: 3344"));