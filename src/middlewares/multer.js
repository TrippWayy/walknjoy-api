const multer = require('multer');
const path = require('path');

const AVATARS_UPLOAD_PATH = path.join(__dirname, '../uploads/avatars');
const BLOGS_UPLOAD_PATH = path.join(__dirname, '../uploads/blogs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = req.body.profileImg !== undefined ? AVATARS_UPLOAD_PATH : BLOGS_UPLOAD_PATH;
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileName = req.body.email !== undefined ? `${req.body.email}_pp` : `${req.body.title}_blog`;
        cb(null, fileName);
    }
});

const upload = multer({ storage });

module.exports = upload;
