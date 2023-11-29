const router = require("express").Router();
const {
    createCar,
    deleteCar,
    getCar,
    getCars,
    updateCar,
    updateCarAvailability,
} = require("../controllers/car");
const {checkAdmin, checkLogin} = require("../utils/verifyToken");
const {addReview, getReviews} = require("../controllers/car");
const {cronDiscount} = require("../middlewares/cronMiddleware");
const Car = require("../model/Car");

//CREATE
router.post("/admin/:rentalID", checkAdmin, cronDiscount(Car), createCar);
//UPDATE
router.put("/availability/:id", updateCarAvailability);
router.put("/admin/:id", checkAdmin, updateCar);
//DELETE
router.delete("/admin/:id/:rentalID", checkAdmin, deleteCar);
//GET
router.get("/find/:id", getCar);
//GET ALL
router.get("/", getCars);

router.post("/review/new/:id", checkLogin, addReview)
router.get("/reviews/:id", getReviews)

module.exports = router;