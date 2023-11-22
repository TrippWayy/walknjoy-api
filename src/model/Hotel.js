const mongoose = require("mongoose");
const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    logo: {
        type: String
    },
    city: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    distance: {
        type: String,
        require: true,
    },
    photos: {
        type: [String],
        default: []
    },
    title: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    viewedUsers: [String],
    rooms: {
        type: [String],
        default: []
    },
    price: {
        type: Number,
        require: true,
    },
    percent: {
        type: Number,
        default: 0
    },
    productType: "Hotel",
    featured: {
        type: Boolean,
        default: false,
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
}, {collection: "Hotels"});

const Hotel = mongoose.model("Hotel", HotelSchema)
module.exports = Hotel;