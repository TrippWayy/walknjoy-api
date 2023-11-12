const router = require("express").Router();
const {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getHotel,
    getHotelRooms,
    getHotels,
    updateHotel,
    addReview,
    getReviews
} = require("../controllers/hotel.js");
const {checkAdmin, checkLogin} = require("../utils/verifyToken")

//CREATE
router.post("/admin", checkAdmin, createHotel);
//UPDATE
router.put("/admin/:id", checkAdmin, updateHotel);
//DELETE
router.delete("/admin/:id", checkAdmin, deleteHotel);
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