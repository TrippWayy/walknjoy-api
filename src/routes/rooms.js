const router = require("express").Router();
const {
    createRoom,
    deleteRoom,
    getRoom,
    getRooms,
    updateRoom,
    updateRoomAvailability,
} = require("../controllers/room");
const {checkAdmin, checkLogin} = require("../utils/verifyToken");
const {cronDiscount} = require("../middlewares/cronMiddleware");
const Room = require("../model/Room");
const {uploadRoom} = require("../middlewares/multer");
const {roomCloud} = require("../middlewares/cloudinary");

//CREATE
router.post("/admin/:hotelID", checkAdmin, uploadRoom, roomCloud, cronDiscount(Room), createRoom);
//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/admin/:id", checkAdmin, updateRoom);
//DELETE
router.delete("/admin/:id/:hotelID", checkAdmin, deleteRoom);
//GET
router.get("/find/:id", getRoom);
//GET ALL
router.get("/", getRooms);

module.exports = router;