const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    viewedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    reviews: [
    {
      reviewData: {
        username: String,
        image: String,
        review: String,
      },
    },
  ],
}, {timestamps: true, collection: "Blogs"})

const Blog = mongoose.model("BlogSchema", BlogSchema)

module.exports = Blog