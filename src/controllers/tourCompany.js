const TourCompany = require("../model/TourCompany")
const Tour = require("../model/Tour")
const Hotel = require("../model/Hotel");

const createCompany = async (req, res, next)=>{
    const newCompany = new TourCompany(req.body);
    try{
        const savedCompany = await newCompany.save()
        res.status(200).json(savedCompany)
    }catch (err) {
        next(err)
    }
}

const updateCompany = async (req, res, next)=>{
    try{
        const updatedCompany = await TourCompany.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(updatedCompany)
    }catch (err) {
        next(err)
    }
}

const deleteCompany = async (req, res, next)=>{
    try{
       await TourCompany.findByIdAndDelete(req.params.id);
       res.status(200).json("Tour company has been deleted.")
    }catch (err) {
        next(err)
    }
}

const getCompany = async (req, res, next)=>{
    try{
        const company = await TourCompany.findById(req.params.id)
        res.status(200).json(company)
    }catch (err) {
        next(err)
    }
}

const getCompanies = async (req, res, next)=>{
    try{
        const companies = await TourCompany.find({})
        res.status(200).json(companies)
    }
    catch (err) {
        next(err)
    }
}

const getCompanyTours = async (req, res, next)=>{
    try{
        const company = await TourCompany.findById(req.params.id)
        const list = await Promise.all(
            company.tours.map((tour)=>{
                return Tour.findById(tour)
            })
        )
        res.status(200).json(list)
    }catch (err) {
        next(err)
    }
}

const addReview = async (req, res, next)=>{
  try{
    const review = req.body.review;
    const tourCompany = await TourCompany.findById({_id: req.params.companyID})
    tourCompany.reviews.push(review)
    await tourCompany.save()
    res.status(200).json({message: "Review has been added successfuly!"})
  }catch (e) {
    next(e)
  }
}

module.exports = {
    createCompany,
    updateCompany,
    deleteCompany,
    getCompany,
    getCompanies,
    getCompanyTours,
    addReview
}