const router = require("express").Router();
const {checkAdmin} = require("../utils/verifyToken")
const {createTour, updateTour, deleteTour, getTour, updateTourAvailability, getTours, countByCategory, countByCity} = require("../controllers/tour")


// CREATE
router.post("/:companyid", checkAdmin, createTour)
// UPDATE
router.put("/:id", checkAdmin, updateTour)
// DELETE
router.delete("/:id/:companyid", checkAdmin, deleteTour)
router.put("/availability/:id", updateTourAvailability)
// GET
router.get("/:id", getTour)
// GET ALL
router.get("/", getTours)
router.get("/countByCategory", countByCategory)
router.get("/countByCity", countByCity)

module.exports = router;