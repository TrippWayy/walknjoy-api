const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    city:{
        type: String,
        require: true
    },
    startDate: {
        type: Date,
        require: true
    },
    finishDate: {
      type: Date,
      require: true
    },
    price: {
        type: Number,
        require: true
    },
    percent: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        require: true
    },
    companyName: {
        type: String,
        require: true
    },
    photos: {
        type: [String],
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    featured: {
        type: Boolean,
        require: true
    },
    viewedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    reviews: [
    {
      reviewData: {
        username: String,
        image: String,
        review: String,
      },
    },
  ],
    raiting: {
      type: Number,
      min: 0,
      max: 5
    },
    placeNumber: [{ number: Number, unavailableDates: {type: [Date]}}],
}, {timestamps: true, collection: "Tours"})

const Tour = mongoose.model("Tour", TourSchema)

module.exports = Tour;