const router = require("express").Router()
const {checkAdmin, checkLogin} = require("../utils/verifyToken")
const {
    createEntertainment,
    updateEntertainment,
    deleteEntertainment,
    getEntertainment,
    getEntertainments,
    countByCity,
    addReview,
    getReviews
} = require("../controllers/entertainment")

// CREATE
router.post("/admin", checkAdmin, createEntertainment)
//UPDATE
router.put("/admin/:id", checkAdmin, updateEntertainment)
//DELETE
router.delete("/admin/:id", checkAdmin, deleteEntertainment)
//GET
router.get("/find/:id", getEntertainment)
router.get("/", getEntertainments)
router.get("/countByCity", countByCity);
router.post("/review/new/:entertainmentID", checkLogin, addReview)
router.get("/reviews/:entertainmentID", getReviews)

module.exports = router;