const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    city:{
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    finishDate: {
      type: Date,
      required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    },
    tourNumbers: [{number: Number, unavailableDates: {type: [Date]}}]
}, {timestamps: true, collection: "Tours"})

const Tour = mongoose.model("Tour", TourSchema)

module.exports = Tour;