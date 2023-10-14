const router = require("express").Router()
const {createBlog, deleteBlog, getBlogs, getBlog} = require("../controllers/blog")
const {checkAdmin, checkLogin} = require("../utils/verifyToken")
const {addReview, getReviews} = require("../controllers/blog");
const cronMiddleware = require("../middlewares/cronMiddleware")
const multer = require("../middlewares/multer")
const upload = require("../middlewares/multer");
const cloudinary = require("../middlewares/cloudinary");

// CREATE
router.post("/", checkAdmin, cronMiddleware.cronRun, upload.single('img'), cloudinary.uploadCloud, createBlog)
router.delete("/:blogID", checkAdmin, deleteBlog)

// GET
router.get("/", checkLogin, getBlogs)
router.get("/:blogID", getBlog)

router.post("/review/new/:blogID", checkLogin, addReview)
router.get("/reviews/:blogID", checkAdmin, getReviews)

module.exports = router;