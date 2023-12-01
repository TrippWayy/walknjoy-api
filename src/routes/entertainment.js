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
const {uploadEntertainment} = require("../middlewares/multer");
const {entertainmentCloud} = require("../middlewares/cloudinary");

// CREATE
router.post("/admin", checkAdmin, uploadEntertainment, entertainmentCloud, createEntertainment)
//UPDATE
router.put("/admin/:id", checkAdmin, updateEntertainment)
//DELETE
router.delete("/admin/:id", checkAdmin, deleteEntertainment)
//GET
router.get("/find/:id", getEntertainment)
router.get("/", getEntertainments)
router.get("/countByCity", countByCity);
router.post("/review/new/:id", checkLogin, addReview)
router.get("/reviews/:id", getReviews)

module.exports = router;