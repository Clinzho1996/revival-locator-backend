// routes/blogRoutes.ts
import express from "express";
import {
	createBlog,
	deleteBlog,
	getBlogById,
	getBlogBySlug,
	getBlogs,
	likeBlog,
	updateBlog,
} from "../controllers/blog.controller";
import { authorize, protect } from "../middleware/auth";

const router = express.Router();

router.post("/", protect, authorize("admin"), createBlog);
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);
router.get("/:id", getBlogById);
router.put("/:id", protect, authorize("admin"), updateBlog);
router.delete("/:id", protect, authorize("admin"), deleteBlog);
router.post("/:id/like", protect, likeBlog);

export default router;
