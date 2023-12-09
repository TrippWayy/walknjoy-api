const router = require("express").Router();
const {checkLogin} = require("../utils/verifyToken")
const {
    getTour,
    updateTourAvailability,
    getTours,
    countByCategory,
    getToursByCompanyName,
    countByCity
} = require("../controllers/tour")
const {getReviews} = require("../controllers/tour");
const {addReview} = require("../controllers/tour");


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