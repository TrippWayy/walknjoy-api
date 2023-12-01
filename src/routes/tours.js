const router = require("express").Router();
const {checkAdmin, checkLogin} = require("../utils/verifyToken")
const {
    createTour,
    updateTour,
    deleteTour,
    getTour,
    updateTourAvailability,
    getTours,
    countByCategory,
    getToursByCompanyName,
    countByCity
} = require("../controllers/tour")
const {getReviews} = require("../controllers/tour");
const {addReview} = require("../controllers/tour");
const {cronDiscount} = require("../middlewares/cronMiddleware");
const Tour = require("../model/Tour");
const {uploadTour} = require("../middlewares/multer");
const {tourCloud} = require("../middlewares/cloudinary");


// CREATE
router.post("/admin/:companyID", uploadTour, tourCloud, checkAdmin, cronDiscount(Tour), createTour)
// UPDATE
router.put("/admin/:id", checkAdmin, updateTour)
// DELETE
router.delete("/admin/:id/:companyid", checkAdmin, deleteTour)
router.put("/availability/:id", updateTourAvailability)
// GET
router.get("/find/:id", getTour)
// GET ALL
router.get("/", getTours)
router.get("/countByCategory", countByCategory)
router.get("/countByCity", countByCity)
router.get("/reviews/:id", getReviews)
router.post("/review/new/:id", checkLogin, addReview)
router.get("/:companyID", getToursByCompanyName)

module.exports = router;