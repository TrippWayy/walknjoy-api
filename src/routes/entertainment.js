const router = require("express").Router()
const {checkAdmin, checkLogin} = require("../utils/verifyToken")
const {
    getEntertainment,
    getEntertainments,
    countByCity,
    addReview,
    getReviews
} = require("../controllers/entertainment")

//GET
router.get("/find/:id", getEntertainment)
router.get("/", getEntertainments)
router.get("/countByCity", countByCity);
router.post("/review/new/:id", checkLogin, addReview)
router.get("/reviews/:id", getReviews)

module.exports = router;