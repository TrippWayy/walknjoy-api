const mongoose = require("mongoose")

const EntertainmentSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    city: {
        type: String
    },
    location: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    productType: {
        type: String,
        default: "Enterrainment"
    },
    startDate: {
        type: Date,
        require: true
    },
    photos: {
      type: [String],
      require: true
    },
    finishDate: {
        type: Date,
        require: true
    },
    companyName: {
        type: String,
        require: true
    },
    viewedUsers: [String],
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    placeNumber: [{number: Number, unavailableDates: {type: [Date]}}],
    reviews: [
        {
            reviewData: {
                username: String,
                image: String,
                review: String,
            },
        },
    ],
}, {timestamps: true, collection: "Entertainments"});

const Entertainment = mongoose.model("EntertainmentsSchema", EntertainmentSchema)

module.exports = Entertainment;