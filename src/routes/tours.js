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


// CREATE
router.post("/admin/:companyID", checkAdmin, createTour)
// UPDATE
router.put("/admin/:id", checkAdmin, updateTour)
// DELETE
router.delete("/admin/:id/:companyid", checkAdmin, deleteTour)
router.put("/availability/:id", updateTourAvailability)
// GET
router.get("/:tourID", getTour)
// GET ALL
router.get("/", getTours)
router.get("/countByCategory", countByCategory)
router.get("/countByCity", countByCity)
router.get("/reviews/:tourID", getReviews)
router.post("/review/new/:tourID", checkLogin, addReview)
router.get("/:companyID", getToursByCompanyName)

module.exports = router;