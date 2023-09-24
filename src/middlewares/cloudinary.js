const cloudinary = require('cloudinary');
const path = require("path")
const fs = require('fs');
cloudinary.config({
          cloud_name: 'dvr9fma4d',
          api_key: '842364714532777',
          api_secret: 'n1_MPkPVrQSazoNjzaXi0N6N2f0'
        });

exports.uploadCloud = async (req, res, next) => {
    try {
        const image = path.join(__dirname, `../uploads/avatars/${req.body.email}_pp.png`);
        const result = await cloudinary.v2.uploader.upload(image, { public_id: `${req.body.username}_pp.png` });

        if (result.secure_url) {
            req.body.img = result.secure_url;
            fs.unlinkSync(image);
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
