const router = require("express").Router();
const {
  createCar,
  deleteCar,
  getCar,
  getCars,
  updateCar,
  updateCarAvailability,
} = require("../controllers/car");
const { checkAdmin } = require("../utils/verifyToken");

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

module.exports = router;