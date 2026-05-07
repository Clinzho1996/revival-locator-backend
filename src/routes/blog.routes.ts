// routes/blogRoutes.ts
import express from "express";
import {
	createBlog,
	deleteBlog,
	getBlogBySlug,
	getBlogs,
	likeBlog,
	updateBlog,
} from "../controllers/blog.controller";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/", protect, createBlog);
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);
router.post("/:id/like", protect, likeBlog);

export default router;
