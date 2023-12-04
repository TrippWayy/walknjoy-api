const UserInteraction = require("../model/UserInteraction")
const Tour = require("../model/Tour");
const Hotel = require("../model/Hotel");
const Car = require("../model/Car");
const Entertainment = require("../model/Entertainment")
const RentalCar = require("../model/RentalCar");
const TourCompany = require("../model/TourCompany");
const Room = require("../model/Room");
const createError = require("../utils/error");

const getRecommendationsByCityPrice = async (req, res, next) => {
    try {
        const user = await UserInteraction.findOne({userID: req.user._id});

        if (!user) {
            next(createError(404, "User interactions not found!"));
        }

        const products = user.products;

        if (!products || products.length === 0) {
            res.send([]); // No products, return an empty array or handle accordingly
            return;
        }

        // Find the product with the longest productID
        const result = products.reduce((acc, product) => {
            const productIDLength = product.productID.length;

            if (productIDLength > acc.maxLength) {
                acc.maxLength = productIDLength;
                acc.resultArray = [{productType: product.productType, productID: product.productID}];
            } else if (productIDLength === acc.maxLength) {
                acc.resultArray.push({productType: product.productType, productID: product.productID});
            }

            return acc;
        }, {maxLength: 0, resultArray: []});

        if (result.resultArray.length === 1) {
            const model = result.resultArray[0].productType;
            const ids = result.resultArray[0].productID;
            const models = {Hotel, Room, TourCompany, Tour, RentalCar, Car, Entertainment};
            const cityPromises = ids.map(async (modelID) => {
                // Ensure the model exists in your models object
                if (models[model]) {
                    const item = await models[model].findOne({_id: modelID});
                    const city = item.city
                    return {city};
                } else {
                    return null; // Handle cases where the model is not found
                }
            });

            const cities = await Promise.all(cityPromises);
            let cityArray = []
            for (const cityArrayElement of cities) {
                cityArray.push(cityArrayElement.city)
            }

            const cityCount = cityArray.reduce((accumulator, city) => {
                accumulator[city] = (accumulator[city] || 0) + 1;
                return accumulator;
            }, {});
            let maxCities = [];
            let maxValue = Number.NEGATIVE_INFINITY;

            // Iterate over the object properties
            for (const key in cityCount) {
                const value = cityCount[key];

                // Check if the current value is greater than or equal to the current max value
                if (value === maxValue) {
                    maxCities.push(key);
                } else if (value > maxValue) {
                    maxValue = value;
                    maxCities = [key];
                }
            }
            if(maxCities.length === 1){
                const data = model.find({city: maxCities[0]})
                res.json(data)
            }
        }

    } catch (e) {
        next(e);
    }
};

module.exports = {getRecommendationsByCityPrice}