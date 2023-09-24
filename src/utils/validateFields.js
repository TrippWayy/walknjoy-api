const {body} = require("express-validator");

exports.validateRegister = ()=>{
    return [
        body("username").trim().isLength({min: 3}).withMessage("Username need to be long than 3 characters")
        .isLength({max: 30}).withMessage("Username need to be short than 10 characters"),
        body('email').trim().isEmail().withMessage("Please enter valid email address"),
        body('password').trim().isLength({min: 8}).withMessage("Password need to be long than 8 characters")
            .isLength({max: 20}).withMessage("Password need to be short than 20 characters")
    ]
}

exports.validateLogin = ()=>{
    return [
        body("username").trim().isLength({min: 3}).withMessage("Username need to be long than 3 characters")
        .isLength({max: 10}).withMessage("Username need to be short than 10 characters"),
        body('password').trim().isLength({min: 8}).withMessage("Password need to be long than 8 characters")
            .isLength({max: 20}).withMessage("Password need to be short than 20 characters")
    ]
}