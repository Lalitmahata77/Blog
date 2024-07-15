import Blog from "../models/blogModel.js";
import catchAsyncHandler from "../middleware/catchAsyncHandler.js";
import ErrorHandler from "../utils/errorHandler.js";


export const getBlogs = async (req, res) => {
    const currentPage = Number(req.query.page) || 1;
    const LIMIT = 10;
    const skipPosts = (currentPage - 1) * LIMIT;
    try {
      const total = await Blog.countDocuments();
      const posts = await Blog.find().populate("author").sort({ createdAt: -1 }).limit(LIMIT).skip(skipPosts);
      res.status(200).json({ data: posts, current: Number(currentPage), numberOfPages: Math.ceil(total / LIMIT) });
  
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  export const getUserDetails = catchAsyncHandler(async(req, res, next)=>{
    const {id} = req.params;
    const blogDetail = await Blog.findById(id).populate("author").populate({
      path : "comments",
      populate: {
        path: 'user',
        select: { 'imgUrl': 1, 'name': 1, '_id': 1, 'email': 1 }
      },
    })
    if (!blogDetail) {
      return next(new ErrorHandler("Blog not found", 401))
    }
    res.status(200).json({blogDetail})
  })


  //create blog
  export const createBlog = catchAsyncHandler(async(req, res, next)=>{
    const blogData = req.body;
    const blog = await Blog.create({...blogData, author: req.user._id})
    if (!blog) {
      return next(new ErrorHandler("Blog not created", 400))
    }

    res.status(200).json({blog})
  })

  export const getPopularTags = async (req, res) => {

    try {
      const response = await Blog.aggregate([{ $unwind: "$tags" }, {
        $group: { /* execute 'grouping' */
          _id: '$tags', /* using the 'token' value as the _id */
          count: { $sum: 1 } /* create a sum value */
        }
      },
      { "$sort": { "count": -1 } }
      ]).limit(15);
      return res.status(200).json({ data: response, success: true });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  //update blog

  export const updateBlog = catchAsyncHandler(async(req, res,next)=>{
    const {id} = req.params;
    const blogData = req.body;
    const blog = await Blog.findById(id)
    if (!blog) {
      return next(new ErrorHandler("Blog not found", 401))
    }
   
    const updatedBlog = await Blog.findByIdAndUpdate(id, blogData, {new : true})
    res.status(200).json({updatedBlog})
  })

  //delete blog
  export const deleteBlog = catchAsyncHandler(async(req, res, next)=>{
    const {id} = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id)
    res.status(200).json({
      message : "Blog deleted successfully",
      deletedBlog
    })
  })

  