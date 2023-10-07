const router = require("express").Router()
const {createBlog, deleteBlog, getBlogs, getBlog} = require("../controllers/blog")
const {checkAdmin, checkLogin} = require("../utils/verifyToken")
const {addReview, getReviews} = require("../controllers/blog");

// CREATE
router.post("/", checkAdmin, createBlog)
router.delete("/:blogID", checkAdmin, deleteBlog)

// GET
router.get("/", checkLogin, getBlogs)
router.get("/:blogID", checkLogin, getBlog)

router.post("/review/new/:blogID", checkLogin, addReview)
router.get("/reviews/:blogID", checkAdmin, getReviews)

module.exports = router;