const router = require("express").Router()
const {createBlog, deleteBlog, getBlogs, getBlog} = require("../controllers/blog")
const {checkAdmin, checkLogin} = require("../utils/verifyToken")
const {addReview, getReviews} = require("../controllers/blog");
const cronMiddleware = require("../middlewares/cronMiddleware")
const upload = require("../middlewares/multer");
const cloudinary = require("../middlewares/cloudinary");

// CREATE
router.post("/admin", checkAdmin, cronMiddleware.cronRun, upload.single('img'), cloudinary.uploadCloud, createBlog)
router.delete("/admin/:blogID", checkAdmin, deleteBlog)

// GET
router.get("/", getBlogs)
router.get("/find/:id", getBlog)

router.post("/review/new/:blogID", checkLogin, addReview)
router.get("/reviews/:blogID", getReviews)

module.exports = router;
