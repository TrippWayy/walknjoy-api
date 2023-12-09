const router = require("express").Router();
const {
    getCar,
    getCars,
    updateCarAvailability,
} = require("../controllers/car");
const {checkLogin} = require("../utils/verifyToken");
const {addReview, getReviews} = require("../controllers/car");

//UPDATE
router.put("/availability/:id", updateCarAvailability);
//GET
router.get("/find/:id", getCar);
//GET ALL
router.get("/", getCars);

router.post("/review/new/:id", checkLogin, addReview)
router.get("/reviews/:id", getReviews)

module.exports = router;