const mongoose = require("mongoose");
const RoomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        percent: {
            type: Number,
            default: 0
        },
        photos: {
          type: [String],
          default: []
        },
        productType: {
            type: String,
            default: "Room"
        },
        viewedUsers: [String],
        maxPeople: {
            type: Number,
            require: true,
        },
        desc: {
            type: String,
            require: true,
        },
        roomNumbers: [{number: Number, unavailableDates: {type: [Date]}}],
    },
    {timestamps: true, collection: "Rooms"}
);

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;