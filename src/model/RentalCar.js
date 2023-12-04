const mongoose = require("mongoose");

const RentalCarSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String
    },
    contact: {
        type: String,
        require: true
    },
    logo: {
        type: String,
    },
    city: {
        type: String
    },
    productType: {
        type: String,
        default: "RentalCar"
    },
    viewedUsers: [String],
    cars: {
        type: [String],
        default: []
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    reviews: [
        {
            reviewData: {
                username: String,
                image: String,
                review: String,
            },
        },
    ],
}, {timestamps: true, collection: "RentalCar"})

const RentalCar = mongoose.model("RentalCar", RentalCarSchema)

module.exports = RentalCar;
