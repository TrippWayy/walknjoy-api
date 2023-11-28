const UserInteraction = require("../model/UserInteraction")
const createError = require("../utils/error");

const getRecommendations = async (req, res, next) => {
    let entertainments;
    try {
        const interactions = await UserInteraction.findOne({userID: req.user._id})

        if (!interactions) {
            next(createError(404, "User interactions not found!"))
        }

        const hotels = interactions.products.find(product => {
            product.productType === "Hotel"
        })
        const tours = interactions.products.find(product => {
            product.productType === "Tour"
        })
        const cars = interactions.products.find(product => {
            product.productType === "Car"
        })
        const entertainments = interactions.products.find(product => {
            product.productType === "Entertainment"
        })

        const products = [hotels.length, tours.length, cars.length, entertainments.length]
        const maxLengthProduct = products.reduce((max, current) => (current.length > max.length ? current : max), '')


    } catch (e) {
        next(e)
    }
}

module.exports = {getRecommendations}