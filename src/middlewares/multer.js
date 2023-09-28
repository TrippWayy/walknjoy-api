const multer = require('multer');
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../uploads/avatars"));
    },
    filename: (req, file, cb) => {
      cb(null, req.body.email + "_pp.png")
    }
});

const upload = multer({storage: storage});

module.exports = upload;