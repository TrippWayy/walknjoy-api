const createError = require("../utils/error")
const User = require("../model/User")
const checkLogin = (req, res, next)=>{
  if(req.isAuthenticated()){
    return next()
  }
  else{
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

const checkUnLogin = (req, res, next)=>{
  if(!req.isAuthenticated()){
    return next()
  }
  else{
    return next(createError(400, "You first must logout!"))
  }
}


const checkAdmin = (req, res, next)=>{
  if(req.user.isAdmin){
    return next()
  }
  else{
    return next(createError(400, "You are not allowed!"))
  }
}

const checkAdminLogin = async (req, res, next)=>{
  if(req.body.username){
    const user = await User.findOne({username: username})
    if(user.isAdmin){
      return next()
    }else{
      return next(createError(400, "You are not allowed!"))
    }
  }else{
    return next(createError(400, "Username field should be fulled!"))
  }
}

const checkEmployee = (req,res, next)=>{
  if(req.user.isEmployee){
    next()
  }
  else{
    return next(createError(400, "Access for only employees!"))
  }
}

module.exports = {checkLogin, checkUnLogin, checkAdmin, checkAdminLogin, checkEmployee}
