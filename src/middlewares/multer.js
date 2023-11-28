const multer = require('multer');
const path = require('path');

const generateFileName = (req, file, cb) => {
    let username = req.user ? req.user.username : req.body.username;
    let prefix = req.route.path === '/blog' ? "blog" : 'pp';
    cb(null, `${username}_${prefix}`);
};

const blogStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/blogs"));
    },
    filename: generateFileName
});

const accountStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/avatars"));
    },
    filename: generateFileName
});

const uploadBlog = multer({ storage: blogStorage });
const uploadAccount = multer({ storage: accountStorage });

module.exports = { uploadBlog, uploadAccount };
