const express = require("express");
const app = express();
const multer = require('multer');

const storage = multer.diskStorage({
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/jpeg') {
            req.fileValidationError = 'goes wrong on the mimetype';
            return cb(null, false, new Error('goes wrong on the mimetype'));
        }
        cb(null, true);
    },
    destination: function (req, file, cb) {
        cb(null, __dirname + '/savePic') //Здесь указывается путь для сохранения файлов
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

app.post('/', upload.any(), function(req, res){
    console.log("req = ", req.files);
    res.send(req.files);
});

app.use('/', function(req, res){
    res.sendfile('index.html');
})

app.listen(4000, () => console.log("test 4000"))
