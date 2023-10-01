const mongoose = require("mongoose")
const {mongo} = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    company: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    }
}, {timestamps: true, collection: "Employees"})

const CompanyEmployee = mongoose.model("CompanyEmployee", EmployeeSchema)

module.exports = CompanyEmployee;