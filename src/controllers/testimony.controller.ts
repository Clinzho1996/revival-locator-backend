// controllers/testimonyController.ts
import { Request, Response } from "express";
import Testimony from "../models/Testimony";

// Public submission - NO authentication required
export const createPublicTestimony = async (req: Request, res: Response) => {
	try {
		const { name, event, content, rating, avatar } = req.body;

		// Validate required fields
		if (!name || !event || !content) {
			return res.status(400).json({
				success: false,
				message: "Name, event, and content are required",
			});
		}

		const testimony = await Testimony.create({
			name,
			event,
			content,
			rating: rating || 5,
			avatar: avatar || "",
			status: "pending", // Always pending for public submissions
			likes: 0,
			likedBy: [],
		});

		return res.status(201).json({
			success: true,
			message: "Testimony submitted for review successfully",
			data: testimony,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to submit testimony",
		});
	}
};

// Admin create - WITH authentication
export const createTestimony = async (req: any, res: Response) => {
	try {
		const { name, event, content, rating, avatar, status } = req.body;

		const testimony = await Testimony.create({
			name,
			event,
			content,
			rating: rating || 5,
			avatar: avatar || "",
			status: status || "approved", // Admin can set status directly
			likes: 0,
			likedBy: [],
		});

		return res.status(201).json({
			success: true,
			message: "Testimony created successfully",
			data: testimony,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to create testimony",
		});
	}
};

// Rest of the controller remains the same...
export const getTestimonies = async (req: Request, res: Response) => {
	try {
		const { page = 1, limit = 10 } = req.query;

		const query: any = { status: "approved" }; // Only show approved testimonies to public

		const testimonies = await Testimony.find(query)
			.sort({ createdAt: -1 })
			.skip((Number(page) - 1) * Number(limit))
			.limit(Number(limit));

		const total = await Testimony.countDocuments(query);

		return res.json({
			success: true,
			message: "Testimonies retrieved successfully",
			data: {
				testimonies,
				total,
				page: Number(page),
				pages: Math.ceil(total / Number(limit)),
			},
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to retrieve testimonies",
		});
	}
};

export const getPendingTestimonies = async (req: Request, res: Response) => {
	try {
		const testimonies = await Testimony.find({ status: "pending" }).sort({
			createdAt: -1,
		});

		return res.json({
			success: true,
			message: "Pending testimonies retrieved",
			data: testimonies,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to retrieve pending testimonies",
		});
	}
};

export const updateTestimony = async (req: Request, res: Response) => {
	try {
		const testimony = await Testimony.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true },
		);

		if (!testimony) {
			return res.status(404).json({
				success: false,
				message: "Testimony not found",
			});
		}

		return res.json({
			success: true,
			message: "Testimony updated successfully",
			data: testimony,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to update testimony",
		});
	}
};

export const deleteTestimony = async (req: Request, res: Response) => {
	try {
		const testimony = await Testimony.findByIdAndDelete(req.params.id);

		if (!testimony) {
			return res.status(404).json({
				success: false,
				message: "Testimony not found",
			});
		}

		return res.json({
			success: true,
			message: "Testimony deleted successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to delete testimony",
		});
	}
};

export const likeTestimony = async (req: any, res: Response) => {
	try {
		const testimony = await Testimony.findById(req.params.id);

		if (!testimony) {
			return res.status(404).json({
				success: false,
				message: "Testimony not found",
			});
		}

		const hasLiked = testimony.likedBy.includes(req.user._id);

		if (hasLiked) {
			testimony.likes -= 1;
			testimony.likedBy = testimony.likedBy.filter(
				(id) => id.toString() !== req.user._id.toString(),
			);
		} else {
			testimony.likes += 1;
			testimony.likedBy.push(req.user._id);
		}

		await testimony.save();

		return res.json({
			success: true,
			message: hasLiked ? "Like removed" : "Testimony liked",
			data: { likes: testimony.likes, liked: !hasLiked },
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Failed to like testimony",
		});
	}
};
