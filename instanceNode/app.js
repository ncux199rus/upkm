const express = require("express");
const app = express();
const multer = require('multer');

const storage = multer.diskStorage({
    //fileFilter - not working!!!!!!!!
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/jpeg') {
            req.fileValidationError = 'goes wrong on the mimetype';
            return cb(null, false, new Error('goes wrong on the mimetype'));
        }
        cb(null, true);
    },
    destination: function (req, file, cb) {
        var path = req.params.id;
        cb(null, __dirname + '/' + path) //Здесь указывается путь для сохранения файлов
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

app.post('/:id', upload.any(), function(req, res){
    console.log("req = ", req.params.id);
    res.send(req.rawHeaders);
});

app.use('/', function(req, res){
    res.sendfile('index.html');
})

app.listen(4000, () => console.log("test 4000"))
