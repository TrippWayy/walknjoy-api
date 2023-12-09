const router = require("express").Router();
const {
    countByCity,
    countByType,
    getHotel,
    getHotelRooms,
    getHotels,
    addReview,
    getReviews
} = require("../controllers/hotel.js");
const {checkLogin} = require("../utils/verifyToken")


//GET
router.get("/find/:id", getHotel);
//GET ALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
router.post("/review/new/:id", checkLogin, addReview)
router.get("/reviews/:id", getReviews)


module.exports = router;