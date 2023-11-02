const router = require("express").Router()
const {checkAdmin, checkLogin} = require("../utils/verifyToken")
const {
    createCompany,
    updateCompany,
    deleteCompany,
    getCompany,
    getCompanies,
    getCompanyTours,
    addReview,
    getReviews
} = require("../controllers/tourCompany")

// CREATE
router.post("/admin/", checkAdmin, createCompany)
// UPDATE
router.put("/admin/:id", checkAdmin, updateCompany)
// DELETE
router.delete("/admin/:id", checkAdmin, deleteCompany)
// GET
router.get("/find/:id", getCompany)
// GET ALL
router.get("/", getCompanies)
router.get("/tour/:id", getCompanyTours)
router.post("/review/new/:companyID", checkLogin, addReview)
router.get("/reviews/:companyID", getReviews)

module.exports = router;
