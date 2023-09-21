const User = require("../model/User")
const Token = require('../model/Token')
const createError = require("../utils/error")

exports.verifyEmail = async (req, res, next)=>{
    userID = req.params.userID
    try{
        const user = await User.findOne({_id: userID})
        if(!user){
            return next(createError(404, "User not found!"))
        }else{
            const token = await Token.findOne({
                userId: user._id,
                tokenId: req.params.token
            })
            if(!token){
                return next(createError(400, "Invalid token!"))
            }else {
                await User.findByIdAndUpdate({_id:user._id}, {emailVerified: true}, {new:true})
                const removedToken = await Token.findByIdAndDelete({_id: token._id})
                res.status(200).send("Email has been verified!")
            }
        }
    }catch (e) {
        next(e)
    }
}

exports.verifyReset = async (req, res, next)=>{
    userID = req.params.userID
    try{
        const user = await User.findOne({_id: userID})
        if(!user){
            return next(createError(404, "User not found!"))
        }else{
            const token = await Token.findOne({
                userId: user._id,
                tokenId: req.params.token
            })
            if(!token){
                return next(createError(400, "Invalid token!"))
            }
            else{
                await User.findByIdAndUpdate({_id:user._id}, {password: req.body.password}, {new:true})
                const removedToken = await Token.findByIdAndDelete({_id: token._id})
                res.status(200).send("Password has been updated!")
            }
        }
    }
    catch (e) {
        next(e)
    }
}
