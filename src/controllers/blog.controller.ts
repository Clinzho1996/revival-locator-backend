// controllers/blogController.ts
import { Request, Response } from "express";
import Blog from "../models/Blog";

export const createBlog = async (req: any, res: Response) => {
	try {
		const { title, content, excerpt, featuredImage, category, tags, readTime } =
			req.body;

		const blog = await Blog.create({
			title,
			content,
			excerpt,
			featuredImage,
			category,
			tags: tags || [],
			readTime,
			author: req.user._id,
			status: "published",
			publishedAt: new Date(),
		});

		await blog.populate("author", "name email");

		return res.status(201).json({
			success: true,
			message: "Blog created successfully",
			data: blog,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to create blog",
		});
	}
};

export const getBlogs = async (req: Request, res: Response) => {
	try {
		const { page = 1, limit = 10, category, search } = req.query;

		let query: any = { status: "published" };

		if (category) {
			query.category = category;
		}

		if (search) {
			query.$or = [
				{ title: { $regex: search, $options: "i" } },
				{ content: { $regex: search, $options: "i" } },
				{ excerpt: { $regex: search, $options: "i" } },
			];
		}

		const blogs = await Blog.find(query)
			.sort({ publishedAt: -1 })
			.skip((Number(page) - 1) * Number(limit))
			.limit(Number(limit))
			.populate("author", "name email");

		const total = await Blog.countDocuments(query);

		return res.json({
			success: true,
			message: "Blogs retrieved successfully",
			data: {
				blogs,
				total,
				page: Number(page),
				pages: Math.ceil(total / Number(limit)),
			},
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to retrieve blogs",
		});
	}
};

export const getBlogBySlug = async (req: Request, res: Response) => {
	try {
		const blog = await Blog.findOne({ slug: req.params.slug }).populate(
			"author",
			"name email",
		);

		if (!blog) {
			return res.status(404).json({
				success: false,
				message: "Blog not found",
			});
		}

		// Increment views
		blog.views += 1;
		await blog.save();

		return res.json({
			success: true,
			message: "Blog retrieved successfully",
			data: blog,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to retrieve blog",
		});
	}
};

export const updateBlog = async (req: Request, res: Response) => {
	try {
		const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		}).populate("author", "name email");

		if (!blog) {
			return res.status(404).json({
				success: false,
				message: "Blog not found",
			});
		}

		return res.json({
			success: true,
			message: "Blog updated successfully",
			data: blog,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to update blog",
		});
	}
};

export const deleteBlog = async (req: Request, res: Response) => {
	try {
		const blog = await Blog.findByIdAndDelete(req.params.id);

		if (!blog) {
			return res.status(404).json({
				success: false,
				message: "Blog not found",
			});
		}

		return res.json({
			success: true,
			message: "Blog deleted successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to delete blog",
		});
	}
};

export const likeBlog = async (req: Request, res: Response) => {
	try {
		const blog = await Blog.findById(req.params.id);

		if (!blog) {
			return res.status(404).json({
				success: false,
				message: "Blog not found",
			});
		}

		blog.likes += 1;
		await blog.save();

		return res.json({
			success: true,
			message: "Blog liked successfully",
			data: { likes: blog.likes },
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to like blog",
		});
	}
};
