const mongoose = require("mongoose")

// Define the Car Schema
const CarSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
    require: true
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
}, {timestamps: true, collection: "Cars"});

// Create the Car model
const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
