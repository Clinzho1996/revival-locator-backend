import { Request, Response } from "express";
import Event from "../models/Event";
import User from "../models/User";
import { sendEmail } from "../utils/email";
import {
	getEventApprovedEmail,
	getEventDeclinedEmail,
} from "../utils/emailTemplate";

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
	try {
		const event = await Event.findById(req.params.id).populate("organizer");

		if (!event) {
			return res.status(404).json({ message: "Event not found" });
		}

		const oldStatus = event.status;
		const newStatus = req.body.status;

		// Handle isFree and price relationship
		if (req.body.isFree !== undefined) {
			// If event is free, set price to 0 regardless of what was sent
			if (req.body.isFree === true) {
				req.body.price = 0;
			}
			// If event is not free, ensure price is a positive number
			else if (
				req.body.isFree === false &&
				(!req.body.price || req.body.price <= 0)
			) {
				return res.status(400).json({
					message:
						"Price is required for paid events and must be greater than 0",
				});
			}
		}

		// Update the event
		Object.assign(event, req.body);
		await event.save();

		// Send email notification if status changed
		if (
			oldStatus !== newStatus &&
			(newStatus === "approved" || newStatus === "rejected")
		) {
			const organizer = await User.findById(event.organizer);

			if (organizer && organizer.email) {
				let subject = "";
				let html = "";

				if (newStatus === "approved") {
					const emailTemplate = getEventApprovedEmail(organizer.name, event);
					subject = emailTemplate.subject;
					html = emailTemplate.html;
				} else if (newStatus === "rejected") {
					const emailTemplate = getEventDeclinedEmail(organizer.name, event);
					subject = emailTemplate.subject;
					html = emailTemplate.html;
				}

				if (subject && html) {
					await sendEmail(organizer.email, subject, html);
					console.log(
						`Status update email sent to ${organizer.email} for event ${event._id}`,
					);
				}
			}
		}

		// Return the updated event with populated data
		const updatedEvent = await Event.findById(event._id)
			.populate("organizer")
			.populate("category");

		res.json(updatedEvent);
	} catch (error) {
		console.error("Error updating event:", error);
		res.status(500).json({ message: "Failed to update event", error });
	}
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
