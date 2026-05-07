// controllers/blogController.ts
import { Request, Response } from "express";
import Blog from "../models/Blog";

// Function to generate slug
function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

export const createBlog = async (req: any, res: Response) => {
	try {
		const { title, content, excerpt, featuredImage, category, tags, readTime } =
			req.body;

		// Generate slug from title
		let baseSlug = generateSlug(title);
		let slug = baseSlug;
		let counter = 1;

		// Check for existing slug and make it unique
		while (await Blog.findOne({ slug })) {
			slug = `${baseSlug}-${counter}`;
			counter++;
		}

		const blog = await Blog.create({
			title,
			slug,
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
	} catch (error: any) {
		console.error("Create blog error:", error);
		return res.status(500).json({
			success: false,
			message: error.message || "Failed to create blog",
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

export const getBlogById = async (req: Request, res: Response) => {
	try {
		const blog = await Blog.findById(req.params.id).populate(
			"author",
			"name email",
		);

		if (!blog) {
			return res.status(404).json({
				success: false,
				message: "Blog not found",
			});
		}

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
		const { title } = req.body;

		// If title is being updated, generate new slug
		if (title) {
			let baseSlug = generateSlug(title);
			let slug = baseSlug;
			let counter = 1;

			// Check for existing slug
			let existingBlog = await Blog.findOne({ slug });
			while (existingBlog && existingBlog._id.toString() !== req.params.id) {
				slug = `${baseSlug}-${counter}`;
				counter++;
				existingBlog = await Blog.findOne({ slug });
			}

			req.body.slug = slug;
		}

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
