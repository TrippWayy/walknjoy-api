const router = require("express").Router()
const {checkAdmin, checkLogin} = require("../utils/verifyToken")
const {createCompany,
        updateCompany,
        deleteCompany,
        getCompany,
        getCompanies,
        getCompanyTours,
        addReview,
        getReviews} = require("../controllers/tourCompany")

// CREATE
router.post("/", checkAdmin, createCompany)
// UPDATE
router.put("/:id", checkAdmin, updateCompany)
// DELETE
router.delete("/:id", checkAdmin, deleteCompany)
// GET
router.delete("/find/:id", checkLogin, getCompany)
// GET ALL
router.get("/", checkLogin, getCompanies)
router.get("/tour/:id", checkLogin, getCompanyTours)
router.post("/review/new/:companyID", checkLogin, addReview)
router.get("/reviews/:companyID", checkAdmin, getReviews)

module.exports = router;
