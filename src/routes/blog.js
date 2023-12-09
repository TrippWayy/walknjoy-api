const router = require("express").Router()
const {getBlogs, getBlog} = require("../controllers/blog")
const {checkAdmin, checkLogin} = require("../utils/verifyToken")
const {addReview, getReviews} = require("../controllers/blog");

// GET
router.get("/", getBlogs)
router.get("/find/:id", getBlog)

router.post("/review/new/:id", checkLogin, addReview)
router.get("/reviews/:id", getReviews)

module.exports = router;
