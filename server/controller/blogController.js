import Blog from "../models/blogModel.js";



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