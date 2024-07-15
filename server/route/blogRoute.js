import express from "express"
import { createBlog, deleteBlog, getBlogs, getPopularTags, getUserDetails, updateBlog } from "../controller/blogController.js"
import { isAthenticated } from "../middleware/authMiddleware.js"
const router = express.Router()


router.route("/").get(getBlogs)
router.route("/:id").get(getUserDetails)
router.route("/").post(isAthenticated, createBlog)
router.route("/topics").get(getPopularTags)
router.route("/:id").put(isAthenticated, updateBlog)
router.route("/:id").delete(isAthenticated, deleteBlog)
export default router