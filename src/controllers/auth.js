const User = require("../model/User")
const bcrypt = require("bcrypt")
const createError = require("../utils/error")
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator");
const Token = require("../model/Token")
const crypto = require("crypto")
const sendMail = require("../utils/sendEmail")

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
      if (user) {
        res.json({user, message: "This email was exists!"})
      }else{
        const newUser = new User({
          ...req.body,
          password: hash,
        });
        await newUser.save();
        const token = new Token({userId: newUser._id, token: crypto.randomBytes(34).toString("hex")}).save();
        const url = `${process.env.BASE_URL}/verify/${newUser._id}/${token}`
        await sendMail(newUser.email, "Verify Email", url)
        res.status(200).send("User has been created.");
      }
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        next(createError(400, errors.errors[0].msg));
      }
      else{

        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));
    
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!isPasswordCorrect)
          return next(createError(400, "Wrong password or username!"));
        if(!user.emailVerified){
          return next(createError(400, "Email not verified!"))
        }
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT
        );
    
        const { password, isAdmin, ...otherDetails } = user._doc;
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ details: { ...otherDetails }, isAdmin });
      }
  } catch (err) {
    next(err);
  }
};


module.exports = {register, login}