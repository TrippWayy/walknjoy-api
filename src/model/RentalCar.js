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
    city:{
      type: String
    },
    cars: {
        type: [String],
        default: []
    },
    raiting: {
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
}, {timestamps: true, collection: "CarRental"})

const RentalCar = mongoose.model("CarRental", RentalCarSchema)

module.exports = RentalCar;