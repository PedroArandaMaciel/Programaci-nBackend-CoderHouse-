import multer from "multer";
import __dirName from "../dirname.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirName+  '/public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const uploader = multer({ storage })


export default uploader