const User = require("../model/User")
const bcrypt = require("bcrypt")
const createError = require("../utils/error")
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator");
const Token = require("../model/Token")
const crypto = require("crypto")
const mail = require('../utils/sendEmail')
const passport = require("passport")
const nodemailer = require("nodemailer");
var http = require('http');
const {v2: cloudinary} = require("cloudinary");
  cloudinary.config({
      cloud_name: 'dvr9fma4d',
      api_key: '842364714532777',
      api_secret: 'n1_MPkPVrQSazoNjzaXi0N6N2f0'
    });

require("../config/passportLocal")(passport)
require("../config/passportGoogle")(passport)

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(createError(400, errors.errors[0].msg))
    }
    else{
      const user = await User.findOne({email: req.body.email})
      if (user && user.emailVerified) {
          if(user){
              const removeUser = await User.findByIdAndDelete({_id: user._id})
          }
        next(createError(400, "This email was exists!"))
      }
      // const {username, email, country, city, phone, password, img} = req.body
      // const result = cloudinary.js.uploader.upload(img, {folder: "avatars"}, function(error, result) {return result});
        const newUser = new User({
          ...req.body,
          password: hash,
        });
        await newUser.save();
        const token = new Token({userId: newUser._id, tokenId: crypto.randomBytes(34).toString("hex")})
        await token.save()
        const url = `${process.env.BASE_URL}/verify/${newUser._id}/${token.tokenId}`
        // url = "http://localhost:3000/verify/userid/tokenId"
        // TODO: Mail sending need to be added here
        res.status(200).json({success: "User has been created!"});
      }
  } catch (err) {
    next(err);
  }
};

const google = async (req, res, next)=>{
    passport.authenticate('google', { scope: ['profile'] })
}

const googleCallback = async (req, res, next)=>{
    passport.authenticate('google', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.status(200).send("User has been authenticated!");
      }
}

const login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred during authentication." });
    }
    if (!user) {
      return res.status(401).json(info); // Pass along the error message from LocalStrategy
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return res.status(500).json({ error: "An error occurred during login." });
      }
      return res.status(200).json({ success: "User has been logged in successfully!" });
    });
  })(req, res, next);
};


const logout = async (req, res, next)=>{
    req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).send("User has been logged out!")
  });
}

const resetPassword = async (req, res, next)=>{
    const email = req.body.email
    try{
        const user = await User.findOne({email: email})
        if(!user){
            return next(createError(404, "User not found with this email!"))
        }
        else if (!user.emailVerified){
            return next(createError(400, "This email is not verified!"))
        }
        else{
            const token = new Token({userId: user._id, tokenId: crypto.randomBytes(34).toString("hex")})
            await token.save()
            const url = `${process.env.BASE_URL}/verify/reset/${user._id}/${token.tokenId}`
            // TODO: Mail sending need to be added here
            res.status(200).send("Mail was sent to reset your password!")
        }
    }
    catch (e) {
        next(e)
    }
}

module.exports = {register, login, logout, resetPassword}
