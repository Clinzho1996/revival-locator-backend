import { Request, Response } from "express";
import Forum from "../models/Forum";

export const createPost = async (req: any, res: Response) => {
	const post = await Forum.create({
		...req.body,
		user: req.user._id,
	});

	return res.status(201).json({
		success: true,
		message: "Post created successfully",
		data: post,
	});
};

export const getPosts = async (_req: Request, res: Response) => {
	const posts = await Forum.find()
		.populate("user", "name email")
		.populate("replies.user", "name email")
		.sort({ createdAt: -1 });

	return res.json({
		success: true,
		message: "Posts retrieved successfully",
		data: {
			posts,
			total: posts.length,
		},
	});
};

export const replyToPost = async (req: any, res: Response) => {
	const post = await Forum.findById(req.params.id);

	if (!post) {
		return res.status(404).json({
			success: false,
			message: "Post not found",
		});
	}

	post.replies.push({
		message: req.body.message,
		user: req.user._id,
	});

	await post.save();

	const updatedPost = await Forum.findById(req.params.id)
		.populate("user", "name email")
		.populate("replies.user", "name email");

	return res.json({
		success: true,
		message: "Reply added successfully",
		data: updatedPost,
	});
};

export const deletePost = async (req: Request, res: Response) => {
	const post = await Forum.findById(req.params.id);

	if (!post) {
		return res.status(404).json({
			success: false,
			message: "Post not found",
		});
	}

	await Forum.findByIdAndDelete(req.params.id);

	return res.json({
		success: true,
		message: "Post deleted successfully",
	});
};
