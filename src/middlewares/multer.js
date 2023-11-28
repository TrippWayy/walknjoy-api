const multer = require('multer');
const path = require("path")

const blogStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/blogs"));
    },
    filename: (req, file, cb) => {
        cb(null, req.body.title + "_blog")
    }
});

const uploadBlog = multer({storage: blogStorage});

const accountStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/avatars"));
    },
    filename: (req, file, cb) => {
        if (req.user) {
            cb(null, req.user.username + "_pp")
        } else {
            cb(null, req.body.username + "_pp")
        }
    }
});

const uploadAccount = multer({storage: accountStorage});

module.exports = {uploadBlog, uploadAccount};