// controllers/authController.ts
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/User";
import { sendEmail } from "../utils/email";
import { getPasswordResetEmail } from "../utils/emailTemplate";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	const existing = await User.findOne({ email });
	if (existing) return res.status(400).json({ message: "User already exists" });

	const hashed = await bcrypt.hash(password, 10);

	const user = await User.create({
		name,
		email,
		password: hashed,
	});

	res.json({ user, token: generateToken(user.id) });
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) return res.status(400).json({ message: "Invalid credentials" });

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

	res.json({ user, token: generateToken(user.id) });
};

// Generate 6-digit OTP
const generateOTP = (): string => {
	return Math.floor(100000 + Math.random() * 900000).toString();
};

// Forgot Password - Send OTP
export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			// For security, don't reveal that user doesn't exist
			return res.status(200).json({
				message:
					"If your email is registered, you will receive a password reset OTP.",
			});
		}

		// Generate 6-digit OTP
		const otp = generateOTP();
		const expires = new Date();
		expires.setMinutes(expires.getMinutes() + 10); // OTP expires in 10 minutes

		// Save OTP and expiry to user document
		user.resetPasswordOTP = otp;
		user.resetPasswordExpires = expires;
		await user.save();

		// Send email with OTP
		const { subject, html } = getPasswordResetEmail(user.name, otp);
		await sendEmail(email, subject, html);

		console.log(`Password reset OTP sent to ${email}: ${otp}`); // For debugging

		return res.status(200).json({
			success: true,
			message: "Password reset OTP sent to your email address.",
		});
	} catch (error) {
		console.error("Forgot password error:", error);
		return res.status(500).json({ message: "Failed to process request" });
	}
};

// Verify OTP
export const verifyOTP = async (req: Request, res: Response) => {
	try {
		const { email, otp } = req.body;

		if (!email || !otp) {
			return res.status(400).json({ message: "Email and OTP are required" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Check if OTP exists and is not expired
		if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp) {
			return res.status(400).json({ message: "Invalid OTP" });
		}

		if (user.resetPasswordExpires && new Date() > user.resetPasswordExpires) {
			return res
				.status(400)
				.json({ message: "OTP has expired. Please request a new one." });
		}

		return res.status(200).json({
			success: true,
			message: "OTP verified successfully",
		});
	} catch (error) {
		console.error("Verify OTP error:", error);
		return res.status(500).json({ message: "Failed to verify OTP" });
	}
};

// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { email, otp, newPassword } = req.body;

		if (!email || !otp || !newPassword) {
			return res
				.status(400)
				.json({ message: "Email, OTP, and new password are required" });
		}

		if (newPassword.length < 6) {
			return res
				.status(400)
				.json({ message: "Password must be at least 6 characters" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Verify OTP
		if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp) {
			return res.status(400).json({ message: "Invalid OTP" });
		}

		if (user.resetPasswordExpires && new Date() > user.resetPasswordExpires) {
			return res
				.status(400)
				.json({ message: "OTP has expired. Please request a new one." });
		}

		// Hash new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update user password and clear OTP fields
		user.password = hashedPassword;
		user.resetPasswordOTP = undefined;
		user.resetPasswordExpires = undefined;
		await user.save();

		return res.status(200).json({
			success: true,
			message:
				"Password reset successfully. You can now login with your new password.",
		});
	} catch (error) {
		console.error("Reset password error:", error);
		return res.status(500).json({ message: "Failed to reset password" });
	}
};
