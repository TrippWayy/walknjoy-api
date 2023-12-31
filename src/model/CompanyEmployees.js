const mongoose = require("mongoose")
const {mongo} = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    companyName: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    companyCategory: {
        type: String,
        require: true
    }
    ,
    password: {
        type: String,
        require: true,
        trim: true
    },
    isEmployee: {
        type: Boolean,
        default: true
    }
}, {timestamps: true, collection: "Employees"})

const CompanyEmployee = mongoose.model("CompanyEmployee", EmployeeSchema)

module.exports = CompanyEmployee;