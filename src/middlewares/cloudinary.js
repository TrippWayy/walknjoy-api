const cloudinary = require('cloudinary');
const path = require('path');
const fs = require('fs');

cloudinary.config({
    cloud_name: 'dvr9fma4d',
    api_key: '842364714532777',
    api_secret: 'n1_MPkPVrQSazoNjzaXi0N6N2f0'
});

const uploadToCloudinary = async (filePath, publicId, req, res, next) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath, { public_id: publicId });

        if (result.secure_url) {
            req.body.img = result.secure_url;
            fs.unlinkSync(filePath);
            next();
        } else {
            console.log("File couldn't be uploaded to Cloudinary");
            res.status(500).json({ error: "File upload failed" });
        }
    } catch (e) {
        console.error("Error uploading to Cloudinary:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

const blogCloud = async (req, res, next) => {
    const image = path.join(__dirname, `../uploads/blogs/${req.body.title}_blog`);
    await uploadToCloudinary(image, `${req.body.title}_blog`, req, res, next);
};

const accountCloud = async (req, res, next) => {
    const image = path.join(__dirname, `../uploads/avatars/${req.user.username || req.body.username}_pp`);

    await uploadToCloudinary(image, `${req.user.username || req.body.username}_pp`, req, res, next);
};

module.exports = { blogCloud, accountCloud };
