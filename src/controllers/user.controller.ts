import bcrypt from "bcryptjs";
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

export const changePassword = async (req: any, res: Response) => {
	try {
		const { currentPassword, newPassword } = req.body;

		// Validate input
		if (!currentPassword || !newPassword) {
			return res.status(400).json({
				success: false,
				message: "Current password and new password are required",
			});
		}

		// Validate new password length
		if (newPassword.length < 6) {
			return res.status(400).json({
				success: false,
				message: "New password must be at least 6 characters long",
			});
		}

		// Find user
		const user = await User.findById(req.user._id);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Verify current password
		const isPasswordValid = await bcrypt.compare(
			currentPassword,
			user.password,
		);
		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: "Current password is incorrect",
			});
		}

		// Hash new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		// Update password
		user.password = hashedPassword;
		await user.save();

		return res.json({
			success: true,
			message: "Password changed successfully",
		});
	} catch (error) {
		console.error("Change password error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to change password",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};

// Add to your userController.ts

export const getAllUsers = async (req: any, res: Response) => {
	try {
		const users = await User.find({}).select("-password");
		return res.json({
			success: true,
			message: "Users retrieved successfully",
			data: users,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to retrieve users",
		});
	}
};

export const updateUserRole = async (req: any, res: Response) => {
	try {
		const { id } = req.params;
		const { role } = req.body;

		if (!["user", "admin"].includes(role)) {
			return res.status(400).json({
				success: false,
				message: "Invalid role",
			});
		}

		const user = await User.findByIdAndUpdate(
			id,
			{ role },
			{ new: true },
		).select("-password");

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		return res.json({
			success: true,
			message: "User role updated successfully",
			data: user,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to update user role",
		});
	}
};

export const deleteUser = async (req: any, res: Response) => {
	try {
		const { id } = req.params;

		// Prevent deleting your own account
		if (id === req.user._id) {
			return res.status(400).json({
				success: false,
				message: "Cannot delete your own account",
			});
		}

		const user = await User.findByIdAndDelete(id);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		return res.json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to delete user",
		});
	}
};
