import { Response } from "express";
import User from "../models/User";

export const toggleBookmark = async (req: any, res: Response) => {
	const user = await User.findById(req.user._id);
	const eventId = req.params.eventId;

	if (!user) {
		return res.status(404).json({
			success: false,
			message: "User not found",
		});
	}

	const index = user.bookmarks.findIndex(
		(id: any) => id.toString() === eventId,
	);

	let action = "";

	if (index > -1) {
		user.bookmarks.splice(index, 1);
		action = "removed";
	} else {
		user.bookmarks.push(eventId);
		action = "added";
	}

	await user.save();

	return res.json({
		success: true,
		message: `Bookmark ${action} successfully`,
		data: {
			bookmarks: user.bookmarks,
			total: user.bookmarks.length,
		},
	});
};

export const getBookmarks = async (req: any, res: Response) => {
	const user = await User.findById(req.user._id).populate("bookmarks");

	if (!user) {
		return res.status(404).json({
			success: false,
			message: "User not found",
		});
	}

	return res.json({
		success: true,
		message: "Bookmarks retrieved successfully",
		data: {
			bookmarks: user.bookmarks,
			total: user.bookmarks.length,
		},
	});
};
