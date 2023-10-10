const mongoose = require("mongoose")

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    tours: {
        type: [String],
        default: []
    },
    address: {
        type: String,
        require: true
    },
    contact: {
        type: String,
        require: true
    },
    logo: {
        type: String,
        require: true
    },
    rating: {
    type: Number,
    min: 0,
    max: 5,
  },
    viewedUsers: [String],
    reviews: [
    {
      reviewData: {
        username: String,
        image: String,
        review: String,
      },
    },
  ],
}, {timestamps: true, collection: "TourCompanies"})

const TourCompany = mongoose.model("TourCompanies", CompanySchema)

module.exports = TourCompany;