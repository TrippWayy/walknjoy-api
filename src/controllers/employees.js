// const CompanyEmployee = require("../model/CompanyEmployees");
// const bcrypt = require("bcrypt");
// const getEmployee = async (req, res, next) => {
//     try {
//         const user = await CompanyEmployee.findOne({username: req.body.username})
//         const comparing = await bcrypt.compare(req.body.password, user.password)
//         if(!comparing){
//             res.status(404).json({error: "Username or password incorrect!"})
//         }else{
//             res.status(200).json({success: "You can send offer to post now!", user})
//         }
//     } catch (e) {
//         next(e)
//     }
// }
//
// const createEmployee = async (req, res, next) => {
//     try {
//         const salt = bcrypt.genSaltSync(10);
//         const hash = await bcrypt.hashSync(req.body.password, salt);
//         const newEmployee = new CompanyEmployee({...req.body, password: hash})
//         const savedEmployee = await newEmployee.save()
//         res.status(200).json(savedEmployee)
//     } catch (e) {
//         next(e)
//     }
// }
//
// const sendPostOffer = async (req, res, next)=>{
//     try{
//         const user = await CompanyEmployee.findOne({username: req.body.username})
//
//     }catch (e) {
//         next(e)
//     }
// }
//
// module.exports = {getEmployee, createEmployee, sendPostOffer}