const multer = require("multer");
const path=require("path");


const  storage = multer.diskStorage({
        destination:path.join(__dirname,"../public/assets/upload"),
        filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
        },
    })
const  upload  = multer({
        limits: {
            fileSize: 4 * 1024 * 1024,
        },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/jpg|jpe|jpeg|png|gif$i/)) {
            cb(new Error("File is not supported"), false);
            }
            cb(null, true);
        },
    })
    

module.exports =multer({storage,upload});