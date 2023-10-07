const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
        trim: true,
        minLength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
        trim: true
    },
    country: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
      isEmployee: {
        type: Boolean,
          default: false
      },
      isSubscriber: {
        type: Boolean,
          default: false
      }
  },
  { timestamps: true , collection: "Users"}
);

const User = mongoose.model("User", UserSchema);
module.exports = User;