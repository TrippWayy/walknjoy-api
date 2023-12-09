const router = require("express").Router()
const {checkLogin} = require("../utils/verifyToken")
const {
    getRental,
    getRentals,
    addReview,
    getReviews,
    getRentalCars,
    countByCity
} = require("../controllers/rentalCar")

//GET
router.get("/find/:id", getRental);
//GET ALL
router.get("/", getRentals);
router.get("/countByCity", countByCity);
router.get("/car/:id", getRentalCars);
router.post("/review/new/:id", checkLogin, addReview)
router.get("/reviews/:id", getReviews)


module.exports = router;