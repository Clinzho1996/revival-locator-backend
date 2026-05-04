import { Request, Response } from "express";
import Chat from "../models/Chat";
import Event from "../models/Event";
import Review from "../models/Review";
import User from "../models/User";

export const getAnalytics = async (_req: Request, res: Response) => {
	const [
		totalEvents,
		totalUsers,
		totalReviews,
		totalMessages,
		recentEvents,
		recentUsers,
	] = await Promise.all([
		Event.countDocuments(),
		User.countDocuments(),
		Review.countDocuments(),
		Chat.countDocuments(),
		Event.find().sort({ createdAt: -1 }).limit(5),
		User.find().sort({ createdAt: -1 }).limit(5),
	]);

	return res.json({
		success: true,
		message: "Analytics retrieved successfully",
		data: {
			overview: {
				totalEvents,
				totalUsers,
				totalReviews,
				totalMessages,
			},
			recent: {
				events: recentEvents,
				users: recentUsers,
			},
		},
	});
};
