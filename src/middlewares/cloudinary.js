const cloudinary = require('cloudinary');
const path = require("path")
const fs = require('fs');
cloudinary.config({
    cloud_name: 'dvr9fma4d',
    api_key: '842364714532777',
    api_secret: 'n1_MPkPVrQSazoNjzaXi0N6N2f0'
});

exports.uploadCloud = async (req, res, next) => {
    let image;
    let result;
    try {
        if (req.body.email) {
            image = path.join(__dirname, `../uploads/avatars/${req.body.email}_pp`);
            result = await cloudinary.v2.uploader.upload(image, {public_id: `${req.body.username}_pp`});
        } else {
            image = path.join(__dirname, `../uploads/blogs/${req.body.title}_blog`);
            result = await cloudinary.v2.uploader.upload(image, {public_id: `${req.body.title}_blog`});
        }

        if (result.secure_url) {
            req.body.profileImg = result.secure_url;
            fs.unlinkSync(image);
            next();
        } else {
            console.log("File couldn't be uploaded to Cloudinary");
            res.status(500).json({error: "File upload failed"});
        }
    } catch (e) {
        console.error("Error uploading to Cloudinary:", e);
        res.status(500).json({error: "Internal server error"});
    }
};

exports.editCloud = async (req, res, next)=>{
        let image;
        let result;
        try {
            if (req.body.profileImg) {
                image = path.join(__dirname, `../uploads/avatars/${req.user.email}_pp`);
                result = await cloudinary.v2.uploader.upload(image, {public_id: `${req.body.username}_pp`});
            }
            if (result.secure_url) {
                req.body.profileImg = result.secure_url;
                fs.unlinkSync(image);
                next();
            } else {
                console.log("File couldn't be uploaded to Cloudinary");
                res.status(500).json({error: "File upload failed"});
            }
        } catch (e) {
            console.error("Error uploading to Cloudinary:", e);
            res.status(500).json({error: "Internal server error"});
        }
}