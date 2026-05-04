import { Request, Response } from "express";
import Subscriber from "../models/Subscriber";

export const subscribe = async (req: Request, res: Response) => {
	const { email } = req.body;

	// prevent duplicate subscriptions
	const existing = await Subscriber.findOne({ email });
	if (existing) {
		return res.status(400).json({
			success: false,
			message: "Email is already subscribed",
		});
	}

	const subscriber = await Subscriber.create({ email });

	return res.status(201).json({
		success: true,
		message: "Subscribed successfully",
		data: subscriber,
	});
};
