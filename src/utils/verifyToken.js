const createError = require("../utils/error")
const User = require("../model/User")
const CompanyEmployee = require("../model/CompanyEmployees");
const checkLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        return next(createError(400, "You first must login!"))
    }
}

// const checkEmployee = (req, res, next)=>{
//   if(req.user.isEmployee){
//     return next()
//   }
//   else{
//     return next(createError(400, "You are not employee!"))
//   }
// }

const checkUnLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next()
    } else {
        return next(createError(400, "You first must logout!"))
    }
}


const checkAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        return next()
    } else {
        return next(createError(400, "You are not allowed!"))
    }
}

const checkAdminLogin = async (req, res, next) => {
    try {
        if (req.body.username) {
            const user = await User.findOne({username: username})
            if (user.isAdmin) {
                return next()
            } else {
                return next(createError(400, "You are not allowed!"))
            }
        } else {
            return next(createError(400, "Username field should be fulled!"))
        }
    } catch (e) {
        next(e)
    }
}

const checkEmployee = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        const employee = await CompanyEmployee.findOne({username: req.body.username})
        if (user.isEmployee && employee) {
            next()
        } else {
            return next(createError(400, "Access for only employees!"))
        }
    } catch (e) {
        next(e)
    }

}

module.exports = {checkLogin, checkUnLogin, checkAdmin, checkAdminLogin, checkEmployee}
