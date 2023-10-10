const mongoose = require("mongoose")

// Define the Car Schema
const CarSchema = new mongoose.Schema({
  title: {
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
  viewedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  photos: {
    type: [String],
    require: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  price: {
    type: Number,
    require: true,
  },
  percent: {
    type: Number,
    default: 0
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
