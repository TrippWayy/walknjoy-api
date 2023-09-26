const User = require("../model/User")
const Token = require('../model/Token')
const createError = require("../utils/error")
const bcrypt = require("bcrypt")

exports.verifyEmail = async (req, res, next)=>{
    const userID = req.params.userID
    try{
        const user = await User.findOne({_id: userID})
        if(!user){
            return next(createError(404, "User not found!"))
        }else{
            const token = await Token.findOne({
                userId: user._id,
                tokenId: req.params.tokenID
            })
            if(!token){
                return next(createError(400, "Invalid token!"))
            }else {
                await User.findByIdAndUpdate({_id:user._id}, {emailVerified: true}, {new:true})
                const removedToken = await Token.findByIdAndDelete({_id: token._id})
                res.status(200).render("emailVerifiedPage")
            }
        }
    }catch (e) {
        next(e)
    }
}

exports.verifyReset = async (req, res, next)=>{
    const userID = req.params.userID
    try{
        const user = await User.findOne({_id: userID})
        if(!user){
            return next(createError(404, "User not found!"))
        }else{
            const token = await Token.findOne({
                userId: user._id,
                tokenId: req.params.tokenID
            })
            if(!token){
                return next(createError(400, "Invalid token!"))
            }
            else{
                if(req.body.passoword === req.body.confirmPassword){
                    const salt = bcrypt.genSaltSync(10);
                    const hash = await bcrypt.hashSync(req.body.password, salt);
                await User.findByIdAndUpdate({_id:user._id}, {password: hash}, {new:true})
                const removedToken = await Token.findByIdAndDelete({_id: token._id})
                res.status(200).json({success: "Password has been updated!"})}
                else{
                    return next(createError(400, "Password and confirm password are not the same!"))
                }
            }
        }
    }
    catch (e) {
        next(e)
    }
}
