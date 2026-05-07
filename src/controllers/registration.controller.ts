// controllers/registration.ts
import { Request, Response } from "express";
import Event from "../models/Event";
import Registration from "../models/Registration";
import { sendEmail } from "../utils/email";

export const registerForEvent = async (req: Request, res: Response) => {
	try {
		const { name, email, phone } = req.body;
		const { eventId } = req.params;

		// 1. Validate input
		if (!name || !email) {
			return res.status(400).json({
				success: false,
				message: "Name and email are required",
			});
		}

		// 2. Check event
		const event = await Event.findById(eventId);
		if (!event) {
			return res.status(404).json({
				success: false,
				message: "Event not found",
			});
		}

		// 3. Prevent duplicate registration (optional but recommended)
		const existing = await Registration.findOne({ event: eventId, email });

		if (existing) {
			return res.status(400).json({
				success: false,
				message: "You have already registered for this event",
			});
		}

		// 4. Save registration
		const registration = await Registration.create({
			event: eventId,
			name,
			email,
			phone,
		});

		// 5. Increment attendees
		event.attendees += 1;
		await event.save();

		// 6. Send confirmation email
		await sendEmail(
			email,
			`Registration Confirmed for ${event.title}`,
			`
				<h2>Hello ${name},</h2>
				<p>You have successfully registered for:</p>
				<h3>${event.title}</h3>
				<p><strong>Date:</strong> ${new Date(event.date).toDateString()}</p>
				<p><strong>Location:</strong> ${event.location?.venue || "TBA"}</p>

				<br/>
				<p>We look forward to seeing you!</p>

				<small>Revival Locator Team</small>
			`,
		);

		return res.status(201).json({
			success: true,
			message: "Registration successful. Confirmation email sent.",
			data: registration,
		});
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			success: false,
			message: "Registration failed",
		});
	}
};
