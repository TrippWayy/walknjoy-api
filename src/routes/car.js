const router = require("express").Router();
const {
  createCar,
  deleteCar,
  getCar,
  getCars,
  updateCar,
  updateCarAvailability,
} = require("../controllers/car");
const { checkAdmin, checkLogin} = require("../utils/verifyToken");
const {addReview, getReviews} = require("../controllers/car");

//CREATE
router.post("/:rentalID", checkAdmin, createCar);
//UPDATE
router.put("/availability/:id", updateCarAvailability);
router.put("/:id", checkAdmin, updateCar);
//DELETE
router.delete("/:id/:rentalID", checkAdmin, deleteCar);
//GET
router.get("/:id", getCar);
//GET ALL
router.get("/", getCars);

router.post("/review/new/:carID", checkLogin, addReview)
router.get("/reviews/:carID", checkAdmin, getReviews)

module.exports = router;