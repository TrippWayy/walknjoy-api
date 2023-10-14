const multer = require('multer');
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(req.body.email !== undefined){
            cb(null, path.join(__dirname, "../uploads/avatars"));
        }
        else{
            cb(null, path.join(__dirname, "../uploads/blogs"));
        }
    },
    filename: (req, file, cb) => {
        if(req.body.email !== undefined){
            cb(null, req.body.email + "_pp")
        }
        else{
            cb(null, req.body.title + "_blog")
        }
    }
});

const upload = multer({storage: storage});

module.exports = upload;