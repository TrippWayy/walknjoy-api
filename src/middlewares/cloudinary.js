const cloudinary = require('cloudinary');
const path = require("path")
const fs = require('fs');


exports.uploadCloud = async (req, res, next)=>{
    try{
        const image = path.join(__dirname, `../uploads/avatars/${req.body.email}_pp.png`)
        cloudinary.config({
          cloud_name: 'dvr9fma4d',
          api_key: '842364714532777',
          api_secret: 'n1_MPkPVrQSazoNjzaXi0N6N2f0'
        });
        try{
         await cloudinary.v2.uploader.upload(image,
          { public_id: `${req.body.username}_pp.png` },
          function(error, result) {req.body.img = result.secure_url; });
         fs.unlinkSync(image);
         next()
        }
        catch (e) {
            next(e)
        }
    }
    catch (e) {
        next(e)
    }
}