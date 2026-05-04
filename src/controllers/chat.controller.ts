import { Request, Response } from "express";
import Chat from "../models/Chat";

export const sendMessage = async (req: any, res: Response) => {
	const message = await Chat.create({
		...req.body,
		user: req.user._id,
	});

	return res.status(201).json({
		success: true,
		message: "Message sent successfully",
		data: message,
	});
};

export const getMessages = async (req: Request, res: Response) => {
	const messages = await Chat.find({
		event: req.params.eventId,
	})
		.populate("user", "name email")
		.sort({ createdAt: 1 });

	return res.json({
		success: true,
		message: "Messages retrieved successfully",
		data: {
			messages,
			total: messages.length,
		},
	});
};
