const Tour = require("../model/Tour");
const Hotel = require("../model/Hotel");
const Car = require("../model/Car");
const Entertainment = require("../model/Entertainment")
const RentalCar = require("../model/RentalCar");
const TourCompany = require("../model/TourCompany");

const countByCity = async (req, res, next) => {
    try {
        const regionsOfAzerbaijan = [
            "Baku",
            "Ganja",
            "Lankaran",
            "Ismayilli",
            "Gabala",
            "Oguz"
        ];

        const countPromises = regionsOfAzerbaijan.map(async (city) => {
            const [hotelCount, tourCount, carCount, entertainmentCount] = await Promise.all([
                Hotel.countDocuments({city}).lean().exec(),
                Tour.countDocuments({city}).lean().exec(),
                Car.countDocuments({city}).lean().exec(),
                Entertainment.countDocuments({city}).lean().exec()
            ]);

            return {city, hotels: hotelCount, tours: tourCount, cars: carCount, entertainments: entertainmentCount};
        });

        const counts = await Promise.all(countPromises);

        res.status(200).json({counts});
    } catch (err) {
        next(err);
    }
};

const getCompanyData = async (req, res, next) => {
    try {
        const models = {
            Hotel: Hotel,
            TourCompany: TourCompany,
            RentalCar: RentalCar,
        };

        const companiesData = {};

        // Loop through each model
        for (const [productType, model] of Object.entries(models)) {
            try {
                const companies = await model.find({}, "_id");

                // Extract the "name" values
                const company = companies.map(companyDoc => companyDoc._id);

                companiesData[productType] = company;
            } catch (err) {
                next(err);
            }
        }
        res.status(200).json(companiesData);
    } catch (e) {
        // Handle errors outside the loop
        next(e);
    }
};

const getFields = async (req, res, next) => {
    try {
        const models = {
            Hotel: Hotel,
            TourCompany: TourCompany,
            RentalCar: RentalCar,
        };

        const companiesData = {};

        // Use for...of loop to iterate over key-value pairs
        for (const [modelName, model] of Object.entries(models)) {
            const fieldNames = Object.keys(model.schema.paths);
            companiesData[modelName] = fieldNames;
        }

        // Return the final result as a dictionary
        res.json(companiesData);
    } catch (error) {
        console.error(error);
        next(error);
    }
};




module.exports = {countByCity, getCompanyData, getFields};
