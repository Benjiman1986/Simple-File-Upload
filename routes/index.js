var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require("formidable");


/* GET home page. */

router.get('/', function(req, res) {
    res.render('index', {
        title: 'File Upload'
    });

});

router.post('/', function(req, res) {
   
    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/upload/temp"; //改变临时目录
    form.parse(req, function(error, fields, files) {
        for (var key in files) {
            var file = files[key];
            var fName = (new Date()).getTime();
            switch (file.type) {
                case "image/jpeg":
                    fName = fName + ".jpg";
                    break;
                case "image/png":
                    fName = fName + ".png";
                    break;
                default:
                    fName = fName + ".png";
                    break;
            }
            console.log(file, file.size);
            var uploadDir = "./public/upload/" + fName;
            fs.rename(file.path, uploadDir, function(err) {
                if (err) {
                    res.write(err + "\n");
                    res.end();
                }
                //res.write("upload image:<br/>");
                res.write("<img src='/upload/" + fName + "' />");
                res.end();

            })

        }
    });
});

module.exports = router;