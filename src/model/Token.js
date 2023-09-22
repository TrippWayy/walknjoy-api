const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: "user",
        unique: true
    },
    tokenId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600
    }
}, {collection: "Tokens"})

const Token = mongoose.model("Token", TokenSchema)

module.exports = Token;