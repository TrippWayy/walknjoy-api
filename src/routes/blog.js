const router = require("express").Router()
const {createBlog, deleteBlog, getBlogs, getBlog} = require("../controllers/blog")
const {checkAdmin, checkLogin} = require("../utils/verifyToken")
const {addReview, getReviews} = require("../controllers/blog");
const {cronNews} = require("../middlewares/cronMiddleware")
const upload = require("../middlewares/multer");
const cloudinary = require("../middlewares/cloudinary");

// CREATE
router.post("/admin", checkAdmin, cronNews, upload.single('img'), cloudinary.uploadCloud, createBlog)
router.delete("/admin/:blogID", checkAdmin, deleteBlog)

// GET
router.get("/", getBlogs)
router.get("/find/:id", getBlog)

router.post("/review/new/:id", checkLogin, addReview)
router.get("/reviews/:id", getReviews)

module.exports = router;
