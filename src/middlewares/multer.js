const multer = require('multer');
const path = require('path');

const generateFileName = (file, suffix, prefix) => {
    const image = path.parse(file.originalname);
    return `${suffix}_${prefix}_${image.name}_${Date.now()}`;
};

const createStorage = (subfolder, fileNamePrefix) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, `../uploads/${subfolder}`));
    },
    filename: (req, file, cb) => {
        const uniqueFilename = generateFileName(file, fileNamePrefix, subfolder);
        req.fileNames = req.fileNames || [];
        req.fileNames.push(uniqueFilename);
        cb(null, uniqueFilename);
    }
});

const uploadAccount = multer({storage: createStorage('avatars', 'pp')}).single('img');

module.exports = {
    uploadAccount,
};
