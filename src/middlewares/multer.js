const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/avatars"));
    },
    filename: (req, file, cb) => {
        // Check if req.body.img exists, if it does, use it as the filename
        if (req.body.img) {
            cb(null, req.user.email + "_pp.png")
        } else if (req.user && req.user.img) {
            // If req.user.img exists, use it as the filename
            cb(null, req.user.img);
        } else {
            // If neither img fields exist, generate a default filename
            cb(null, req.body.email + "_pp.png");
        }
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
