const Room = require("../model/Room");
const Hotel = require("../model/Hotel");
const {createError} = require("../utils/error");
const Blog = require("../model/Blog");
const {generateUniqueIdentifier} = require("../middlewares/uniqueKeyMiddleware");

const createRoom = async (req, res, next) => {
    const hotelID = req.params.hotelID;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelID, {
                $push: {rooms: savedRoom._id},
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
};

const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};
const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            {"roomNumbers._id": req.params.id},
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};
const deleteRoom = async (req, res, next) => {
    const hotelID = req.params.hotelID;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelID, {
                $pull: {rooms: req.params.id},
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Room has been deleted.");
    } catch (err) {
        next(err);
    }
};
const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.roomID);
        const userIdentifier = req.cookies['uniqueViewer'];

        if (!userIdentifier) {
            const newIdentifier = generateUniqueIdentifier();
            if (!room.viewedUsers.includes(newIdentifier)) {
                res.cookie('uniqueViewer', newIdentifier, {maxAge: 31536000000});
                room.viewedUsers.push(newIdentifier);
                await room.save();
            }
        }

        res.json(room);
    } catch (error) {
        next(error);
    }
};
const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getRooms,
    getRoom,
    createRoom,
    deleteRoom,
    updateRoom,
    updateRoomAvailability
}