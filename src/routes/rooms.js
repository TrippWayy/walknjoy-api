const router = require("express").Router();
const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} = require("../controllers/room");
const { checkAdmin } = require("../utils/verifyToken");

//CREATE
router.post("/:hotelid", checkAdmin, createRoom);
//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", checkAdmin, updateRoom);
//DELETE
router.delete("/:id/:hotelid", checkAdmin, deleteRoom);
//GET
router.get("/:id", getRoom);
//GET ALL
router.get("/", getRooms);

module.exports = router;