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
    city: {
        type: String
    },
    productType: {
        type: String,
        default: "Blog"
    },
    viewedUsers: [String],
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