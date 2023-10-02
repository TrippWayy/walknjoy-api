const User = require("../model/User");

const updateUser = async (req,res,next)=>{
  console.log("controller icine girdi")
  try {
      const updatedUser = await User.findByIdAndUpdate(
          {_id: req.user._id},
          {$set: req.body},
          {new: true}
      );
      res.status(200).json(updatedUser);
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