import { Request, Response } from "express";
import Review from "../models/Review";

export const createReview = async (req: any, res: Response) => {
	const review = await Review.create({
		...req.body,
		user: req.user._id,
	});

	return res.status(201).json({
		success: true,
		message: "Review created successfully",
		data: review,
	});
};

export const getReviewsByEvent = async (req: Request, res: Response) => {
	const reviews = await Review.find({
		event: req.params.eventId,
	}).populate("user", "name email");

	return res.json({
		success: true,
		message: "Reviews retrieved successfully",
		data: {
			reviews,
			total: reviews.length,
		},
	});
};

export const deleteReview = async (req: Request, res: Response) => {
	const review = await Review.findById(req.params.id);

	if (!review) {
		return res.status(404).json({
			success: false,
			message: "Review not found",
		});
	}

	await Review.findByIdAndDelete(req.params.id);

	return res.json({
		success: true,
		message: "Review deleted successfully",
	});
};
