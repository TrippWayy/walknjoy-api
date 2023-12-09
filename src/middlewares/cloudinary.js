const cloudinary = require('cloudinary');
const path = require('path');
const createError = require("../utils/error");
const fs = require('fs').promises;

cloudinary.config({
    cloud_name: 'dvr9fma4d',
    api_key: '842364714532777',
    api_secret: 'n1_MPkPVrQSazoNjzaXi0N6N2f0'
});

const uploadToCloudinary = async (filePath, publicId) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath, {public_id: publicId});
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw new Error("File upload failed");
    }
};

const handleCloudinaryUpload = async (req, res, next, filePath, publicId) => {
    try {
        const secureUrl = await uploadToCloudinary(filePath, publicId);
        if (secureUrl) {
            req.body.img = secureUrl;
            await fs.unlink(filePath);
            next();
        } else {
            next(createError(400, "File upload failed"));
        }
    } catch (error) {
        console.error("Error handling Cloudinary upload:", error);
        next(error);
    }
};

const createCloudMiddleware = (subfolder, field) => async (req, res, next) => {
    try {
        if (field === "logo") {
            req.body[field] = ""
        } else {
            req.body[field] = [];
        }

        for (const name of req.fileNames) {
            const image = path.join(__dirname, `../uploads/${subfolder}/${name}`);
            const secureUrl = await uploadToCloudinary(image, name);

            if (secureUrl) {
                if (field === "photos") {
                    req.body[field].push(secureUrl);
                } else {
                    req.body[field] = secureUrl;
                }

                await fs.unlink(image);
            } else {
                next(createError(400, "File upload failed"));
            }
        }

        next();
    } catch (error) {
        console.error(`Error in ${subfolder}Cloud middleware:`, error);
        next(error);
    }
};

const accountCloud = createCloudMiddleware('avatars', 'img');

module.exports = {
    accountCloud,
};
