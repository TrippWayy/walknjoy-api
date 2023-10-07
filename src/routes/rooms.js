const router = require("express").Router();
const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} = require("../controllers/room");
const { checkAdmin, checkLogin} = require("../utils/verifyToken");

//CREATE
router.post("/:hotelid", checkAdmin, createRoom);
//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", checkAdmin, updateRoom);
//DELETE
router.delete("/:id/:hotelID", checkAdmin, deleteRoom);
//GET
router.get("/:id", checkLogin, getRoom);
//GET ALL
router.get("/", checkLogin, getRooms);

module.exports = router;