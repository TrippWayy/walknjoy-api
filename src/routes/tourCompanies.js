const router = require("express").Router()
const {checkLogin} = require("../utils/verifyToken")
const {
    getCompany,
    getCompanies,
    getCompanyTours,
    addReview,
    getReviews
} = require("../controllers/tourCompany")

// GET
router.get("/find/:id", getCompany)
// GET ALL
router.get("/", getCompanies)
router.get("/tour/:id", getCompanyTours)
router.post("/review/new/:id", checkLogin, addReview)
router.get("/reviews/:id", getReviews)

module.exports = router;
