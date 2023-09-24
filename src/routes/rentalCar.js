const router = require("express").Router()
const {checkAdmin, checkLogin} = require("../utils/verifyToken")
const {
    createRental,
    updateRental,
    deleteRental,
    getRental,
    getRentals,
    addReview,
    getReviews,
    getRentalCars,
    countByCity
} = require("../controllers/rentalCar")

//CREATE
router.post("/", checkAdmin, createRental);
//UPDATE
router.put("/:id", checkAdmin, updateRental);
//DELETE
router.delete("/:id", checkAdmin, deleteRental);
//GET
router.get("/find/:id", getRental);
//GET ALL
router.get("/", getRentals);
router.get("/countByCity", countByCity);
router.get("/car/:id", getRentalCars);
router.post("/review/new/:rentalID", checkLogin, addReview)
router.get("/reviews/:rentalID", getReviews)


module.exports = router;