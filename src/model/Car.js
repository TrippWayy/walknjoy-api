const mongoose = require("mongoose")

// Define the Car Schema
const CarSchema = new mongoose.Schema({
  make: {
    type: String,
    require: true,
  },
  model: {
    type: String,
    require: true,
  },
  year: {
    type: Number,
    require: true,
  },
  photos: {
    type: [String],
    require: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  pricePerDay: {
    type: Number,
    require: true,
  },
  available: {
    type: Boolean,
    default: true,
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
}, {timestamps: true, collection: "Cars"});

// Create the Car model
const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
