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
      const {username, email, country, city, phone, password, img} = req.body
      const result = cloudinary.uploader.upload(img, {folder: "avatars"}, function(error, result) {return result});
        const newUser = new User({
          username,
            email,
            country,
            city,
            phone,
            img: (await result).secure_url,
          password: hash,
        });
        await newUser.save();
        const token = new Token({userId: newUser._id, token: crypto.randomBytes(34).toString("hex")}).save();
        const url = `${process.env.BASE_URL}/verify/${newUser._id}/${token}`
        var transporter = nodemailer.createTransport("smtps://test@gmail.com:"+encodeURIComponent('test12345') + "@smtp.gmail.com:465");
        var httpServer = http.createServer(function (request, response)
      {
          transporter.sendMail({
             from: 'mansimovnijat@gmail.com',
             to: newUser.email,
             subject: 'Verify token',
             text: url
          });
          }, (err, info) => {
            console.log(info.envelope);
            console.log(info.messageId);
        })
        res.status(200).send("User has been created.");
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
  try {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        next(createError(400, errors.errors[0].msg));
      }
      else {
        passport.authenticate('local', {
            successRedirect: "/",
            failureRedirect: "/auth/login",
            failureFlash: true,
        })(req, res, next)
      }
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next)=>{
    req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).send("User has been logged out!")
  });
}

module.exports = {register, google, googleCallback, login, logout}