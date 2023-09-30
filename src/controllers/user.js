const User = require("../model/User");
const Token = require("../model/Token");
const crypto = require("crypto");
const send = require("../utils/sendEmail");

const updateUser = async (req,res,next)=>{
  try {
    if(req.body.email && req.body.email !== req.user.email){
    const dataUser = await User.findByIdAndUpdate({_id: req.user._id}, {emailVerified: false}, {new: true})
    const token = new Token({
      userId: req.user._id,
      tokenId: crypto.randomBytes(34).toString('hex'),
    });
    await token.save();
    const url = `${process.env.BASE_URL}/api/verify/${req.user._id}/${token.tokenId}`;
    const options = {
      email: req.body.email,
      subject: 'Verify Email',
      message: url,
    };
    await send.sendMail(options);
  }
    if(req.user.emailVerified) {
      const updatedUser = await User.findByIdAndUpdate(
          {_id: req.user._id},
          {$set: req.body},
          {new: true}
      );
      res.status(200).json(updatedUser);
    }
    else{
      return res.status(400).json({error: "You have to first verified email!"})
      }
  } catch (err) {
    next(err);
  }
}

const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete({_id: req.user._id});
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}


module.exports = {updateUser, deleteUser, getUsers, getUser}