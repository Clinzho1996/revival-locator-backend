import { Request, Response } from "express";
import Chat from "../models/Chat";

import { io } from "../server";

export const sendMessage = async (req: any, res: Response) => {
	const message = await Chat.create({
		...req.body,
		user: req.user._id,
	});

	const populated = await message.populate("user", "name");

	// 🔥 Emit to event room
	io.to(req.body.event).emit("new_message", populated);

	return res.status(201).json({
		success: true,
		message: "Message sent successfully",
		data: populated,
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

export const reactToMessage = async (req: any, res: Response) => {
	const { messageId } = req.params;
	const { emoji } = req.body;

	const message = await Chat.findById(messageId);

	if (!message) {
		return res.status(404).json({ success: false, message: "Not found" });
	}

	// Toggle reaction
	const existing = message.reactions.find(
		(r: any) =>
			r.user.toString() === req.user._id.toString() && r.emoji === emoji,
	);

	if (existing) {
		message.reactions = message.reactions.filter(
			(r: any) =>
				!(r.user.toString() === req.user._id.toString() && r.emoji === emoji),
		);
	} else {
		message.reactions.push({
			user: req.user._id,
			emoji,
		});
	}

	await message.save();

	const updated = await message.populate("user", "name");

	// 🔥 Emit reaction update
	io.to(message.event.toString()).emit("reaction_update", updated);

	return res.json({
		success: true,
		data: updated,
	});
};
