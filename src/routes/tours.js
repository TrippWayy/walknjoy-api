const router = require("../model/Tour")
const {verifyUser, verifyAdmin} = require("../utils/verifyToken")
const {createTour, updateTour, deleteTour, getTour, updateTourAvailability, getTours, countByCategory, countByCity} = require("../controllers/tour")


// CREATE
router.post("/:companyid", verifyAdmin, createTour)
// UPDATE
router.put("/:id", verifyAdmin, updateTour)
// DELETE
router.delete("/:id/:companyid", verifyAdmin, deleteTour)
router.put("/availability/:id", updateTourAvailability)
// GET
router.get("/:id", getTour)
// GET ALL
router.get("/", getTours)
router.get("/countByCategory", countByCategory)
router.get("/countByCity", countByCity)

module.exports = router;