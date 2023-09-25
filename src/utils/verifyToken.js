const createError = require("../utils/error")

const checkLogin = (req, res, next)=>{
  if(req.isAuthenticated()){
    return next()
  }
  else{
    return next(createError(400, "You first must login!"))
  }
}

const checkUnLogin = (req, res, next)=>{
  if(!req.isAuthenticated()){
    return next()
  }
  else{
    return next(createError(400, "You first must logout!"))
  }
}


const checkAdmin = (req, res, next)=>{
  if(req.isAuthenticated() && req.user.isAdmin){
    return next()
  }
  else{
    return next(createError(400, "You are not allowed!"))
  }
}

module.exports = {checkLogin, checkUnLogin, checkAdmin}
