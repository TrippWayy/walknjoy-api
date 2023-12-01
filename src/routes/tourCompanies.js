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
// const {uploadLogo} = require("../middlewares/multer");
const {tourCompanyCloud} = require("../middlewares/cloudinary");

// CREATE
router.post("/admin", tourCompanyCloud, checkAdmin, createCompany)
// UPDATE
router.put("/admin/:id", checkAdmin, updateCompany)
// DELETE
router.delete("/admin/:id", checkAdmin, deleteCompany)
// GET
router.get("/find/:id", getCompany)
// GET ALL
router.get("/", getCompanies)
router.get("/tour/:id", getCompanyTours)
router.post("/review/new/:id", checkLogin, addReview)
router.get("/reviews/:id", getReviews)

module.exports = router;
