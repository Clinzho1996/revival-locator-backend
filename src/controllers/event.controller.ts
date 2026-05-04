import { Request, Response } from "express";
import Event from "../models/Event";

export const createEvent = async (req: any, res: Response) => {
	const event = await Event.create({
		...req.body,
		organizer: req.user._id,
	});

	res.json(event);
};

export const getEvents = async (_req: Request, res: Response) => {
	const events = await Event.find().populate("category organizer");
	res.json(events);
};

export const getEventById = async (req: Request, res: Response) => {
	const event = await Event.findById(req.params.id).populate(
		"category organizer",
	);

	if (!event) return res.status(404).json({ message: "Event not found" });

	res.json(event);
};

export const updateEvent = async (req: any, res: Response) => {
	const event = await Event.findById(req.params.id);

	if (!event) return res.status(404).json({ message: "Not found" });

	Object.assign(event, req.body);
	await event.save();

	res.json(event);
};

export const deleteEvent = async (req: Request, res: Response) => {
	await Event.findByIdAndDelete(req.params.id);
	res.json({ message: "Event deleted" });
};

export const searchEvents = async (req: Request, res: Response) => {
	const { keyword, city } = req.query;

	const events = await Event.find({
		$or: [
			{ title: { $regex: keyword, $options: "i" } },
			{ "location.address": { $regex: city, $options: "i" } },
		],
	});

	res.json(events);
};
