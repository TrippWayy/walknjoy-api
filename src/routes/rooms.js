const router = require("express").Router();
const {
    getRoom,
    getRooms,
    updateRoomAvailability,
} = require("../controllers/room");

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
//GET
router.get("/find/:id", getRoom);
//GET ALL
router.get("/", getRooms);

module.exports = router;