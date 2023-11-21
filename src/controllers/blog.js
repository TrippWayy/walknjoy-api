const Blog = require("../model/Blog")
const {getItem, getItems, generalAddReview, generalGetReviews} = require("../middlewares/generalControllers");
const createBlog = async (req, res, next) => {
    try {
        const newBlog = new Blog(req.body)
        const savedBlog = await newBlog.save()
        res.status(200).json(savedBlog)
    } catch (e) {
        next(e)
    }
}

const deleteBlog = async (req, res, next) => {
    try {
        await Blog.findByIdAndDelete(req.params.blogID)
        res.status(200).json({success: "Blog has been deleted successfuly!"})
    } catch (e) {
        next(e)
    }

}

const getBlogs = async (req, res, next) => {
    getItems(Blog, req, res, next)
}

const getBlog = async (req, res, next) => {
    getItem(Blog, req, res, next)
};


const addReview = async (req, res, next) => {
    generalAddReview(Blog, req, res, next)
}

const getReviews = async (req, res, next) => {
    generalGetReviews(Blog, req, res, next)
}

module.exports = {createBlog, deleteBlog, getBlogs, getBlog, getReviews, addReview}