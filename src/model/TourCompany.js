const mongoose = require("mongoose")

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tours: {
        type: [String]
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
    }
}, {timestamps: true, collection: "TourCompanies"})

const TourCompany = mongoose.model("TourCompanies", CompanySchema)

module.exports = TourCompany;