const router = require("express").Router();
const {checkAdmin, checkLogin} = require("../utils/verifyToken")
const {createTour, updateTour, deleteTour, getTour, updateTourAvailability, getTours, countByCategory, getToursByCompanyName, countByCity} = require("../controllers/tour")
const {getReviews} = require("../controllers/tour");
const {addReview} = require("../controllers/tour");


// CREATE
router.post("/:companyID", checkAdmin, createTour)
// UPDATE
router.put("/:id", checkAdmin, updateTour)
// DELETE
router.delete("/:id/:companyid", checkAdmin, deleteTour)
router.put("/availability/:id", updateTourAvailability)
// GET
router.get("/:id", getTour)
// GET ALL
router.get("/", checkLogin, getTours)
router.get("/countByCategory", checkLogin, countByCategory)
router.get("/countByCity", checkLogin, countByCity)
router.get("/reviews/:tourID", checkAdmin, getReviews)
router.post("/review/new/:tourID", checkLogin, addReview)
router.get("/:companyID", checkLogin, getToursByCompanyName)

module.exports = router;