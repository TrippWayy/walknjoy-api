const Blog = require("../model/Blog")
const Car = require("../model/Car");
const createBlog = async (req, res, next)=>{
    try{
        const newBlog = new Blog(req.body)
        const savedBlog = await newBlog.save()
        res.status(200).json(savedBlog)
    }catch (e) {
        next(e)
    }
}

const deleteBlog = async (req, res, next)=>{
    try{
        await Blog.findByIdAndDelete(req.params.blogID)
        res.status(200).json({success: "Blog has been deleted successfuly!"})
    }
    catch (e) {
        next(e)
    }

}

const getBlogs = async (req, res, next)=>{
    try{
        const blogs = await Blog.find({})
        res.status(200).json(blogs)
    }catch (e) {
        next(e)
    }
}

const getBlog = async (req, res, next)=>{
    try{
        const blog = await Blog.findById(req.params.blogID)
        res.status(200).json(blog)
    }catch (e) {
        next(e)
    }
}

const addReview = async (req, res, next)=>{
  try{
    const reviewData = {
      username: req.user.username,
      image: req.user.img,
      review: req.body.review,
    };
    const blog = await Blog.findById(req.params.blogID)
    blog.reviews.push({reviewData})
    await blog.save()
    res.status(200).json({success: "Review has been added successfuly!"})
  }catch (e) {
    next(e)
  }
}

const getReviews = async (req, res, next)=>{
    try{
        const blog = await Blog.findById(req.params.blogID)
        res.status(200).json({reviews: blog.reviews, count: blog.reviews.length})
    }catch (e) {
        next(e)
    }
}

module.exports = {createBlog, deleteBlog, getBlogs, getBlog, getReviews, addReview}