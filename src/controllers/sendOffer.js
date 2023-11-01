const send = require("../utils/sendEmail")
const Hotel = require("../model/Hotel")
const Tour = require("../model/Tour")
const Car = require("../model/Car")
const sendOffer = async (req, res, next) => {
    const employeeInfo = req.body;
    try {
        const options = {
            email: process.env.SMTP_MAIL,
            subject: 'Collaborate Offer',
            message: `<h3>${employeeInfo.companyName}</h3><br><h3>${employeeInfo.fullName}</h3><br><h3>${employeeInfo.job}</h3><br><h3>${employeeInfo.businessEmail}</h3><br><h3>${employeeInfo.businessPhone}</h3><br><h6>${employeeInfo.message}</h6>`,
        };
        await send.sendMail(options);
        res.status(200).json({success: 'Collaborate offer has been sent to Walknjoy!'});
    } catch (e) {
        next(e)
    }
}

const getModelKeys = async (req, res, next) => {
    const employeeInfo = req.user;
    const schemaMap = {
        Hotel: Hotel.schema.paths,
        Tour: Tour.schema.paths,
        Car: Car.schema.paths,
    };

    const removedItems = ["createdAt", "updatedAt", "_id", "__v", "reviews", "raiting"];

    try {
        if (schemaMap[req.user.company]) {
            const paths = Object.keys(schemaMap[req.user.company])
                .filter(path => !removedItems.includes(path));

            res.send(paths);
        } else {
            // Handle the case when req.user.company is not recognized
            res.status(400).send('Invalid company type');
        }
    } catch (e) {
        next(e);
    }
}


module.exports = {sendOffer, getModelKeys}