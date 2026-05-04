import { Response } from "express";
import Event from "../models/Event";
import User from "../models/User";

export const getProfile = async (req: any, res: Response) => {
	const user = await User.findById(req.user._id).populate("bookmarks");

	if (!user) {
		return res.status(404).json({
			success: false,
			message: "User not found",
		});
	}

	return res.json({
		success: true,
		message: "Profile retrieved successfully",
		data: user,
	});
};

export const updateProfile = async (req: any, res: Response) => {
	const user = await User.findByIdAndUpdate(req.user._id, req.body, {
		new: true,
	}).populate("bookmarks");

	if (!user) {
		return res.status(404).json({
			success: false,
			message: "User not found",
		});
	}

	return res.json({
		success: true,
		message: "Profile updated successfully",
		data: user,
	});
};

export const getUserDashboard = async (req: any, res: Response) => {
	const events = await Event.find({ organizer: req.user._id });

	const user = await User.findById(req.user._id).populate("bookmarks");

	return res.json({
		success: true,
		message: "Dashboard retrieved successfully",
		data: {
			myEvents: events,
			bookmarks: user?.bookmarks || [],
			stats: {
				totalEvents: events.length,
				totalBookmarks: user?.bookmarks?.length || 0,
			},
		},
	});
};
