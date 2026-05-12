import { Request, Response } from "express";
import Event from "../models/Event";
import User from "../models/User";
import { sendEmail } from "../utils/email";

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

		// Store the original data before update
		const previousData = { ...event.toObject() };

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
					subject = `✅ Your Event "${event.title}" Has Been Approved!`;
					html = `
						<!DOCTYPE html>
						<html>
						<head>
							<style>
								body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
								.container { max-width: 600px; margin: 0 auto; padding: 20px; }
								.header { text-align: center; padding: 20px 0; background: linear-gradient(135deg, #B91C1C, #7F1D1D); color: white; border-radius: 10px 10px 0 0; }
								.content { padding: 30px; background: #f9f9f9; }
								.event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22C55E; }
								.button { display: inline-block; padding: 12px 24px; background: #B91C1C; color: white; text-decoration: none; border-radius: 5px; }
								.footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
							</style>
						</head>
						<body>
							<div class="container">
								<div class="header">
									<h1>Event Approved! 🎉</h1>
								</div>
								<div class="content">
									<h2>Hello ${organizer.name},</h2>
									<p>Great news! Your event has been reviewed and <strong>APPROVED</strong> by our team.</p>
									<div class="event-details">
										<h3 style="margin-top: 0; color: #22C55E;">${event.title}</h3>
										<p><strong>📅 Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
										<p><strong>📍 Location:</strong> ${typeof event.location === "object" ? event.location.address + ", " + event.location.city : event.location}</p>
										<p><strong>📊 Status:</strong> <span style="color: #22C55E;">● Approved</span></p>
									</div>
									<p>Your event is now live and visible to thousands of believers looking for their next divine encounter!</p>
									<p>What happens next?</p>
									<ul>
										<li>✅ Believers can now discover and register for your event</li>
										<li>📈 Track interest and registrations in your dashboard</li>
										<li>📧 You'll receive notifications when people show interest</li>
									</ul>
									<a href="https://revivallocator.com/my-events" class="button">View Your Events</a>
									<p style="margin-top: 20px;">Share your event on social media to reach even more people!</p>
								</div>
								<div class="footer">
									<p>Need help? Contact us at support@revivallocator.com</p>
									<p>&copy; 2025 Revival Locator. All rights reserved.</p>
								</div>
							</div>
						</body>
						</html>
					`;
				} else if (newStatus === "rejected") {
					subject = `❌ Update on Your Event "${event.title}"`;
					html = `
						<!DOCTYPE html>
						<html>
						<head>
							<style>
								body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
								.container { max-width: 600px; margin: 0 auto; padding: 20px; }
								.header { text-align: center; padding: 20px 0; background: linear-gradient(135deg, #B91C1C, #7F1D1D); color: white; border-radius: 10px 10px 0 0; }
								.content { padding: 30px; background: #f9f9f9; }
								.event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #EF4444; }
								.footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
							</style>
						</head>
						<body>
							<div class="container">
								<div class="header">
									<h1>Event Update</h1>
								</div>
								<div class="content">
									<h2>Hello ${organizer.name},</h2>
									<p>We have reviewed your event submission. Unfortunately, it has been <strong>DECLINED</strong> at this time.</p>
									<div class="event-details">
										<h3 style="margin-top: 0; color: #EF4444;">${event.title}</h3>
										<p><strong>📅 Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
										<p><strong>📍 Location:</strong> ${typeof event.location === "object" ? event.location.address + ", " + event.location.city : event.location}</p>
										<p><strong>📊 Status:</strong> <span style="color: #EF4444;">● Not Approved</span></p>
									</div>
									<p><strong>Common reasons for decline:</strong></p>
									<ul>
										<li>Incomplete or missing event information</li>
										<li>Event date has already passed</li>
										<li>Content that doesn't align with our community guidelines</li>
										<li>Duplicate event listing</li>
									</ul>
									<p>You can edit your event and resubmit it for review. Our team will be happy to reconsider your event once the necessary changes are made.</p>
									<a href="https://revivallocator.com/my-events" class="button">Edit Your Event</a>
									<p style="margin-top: 20px;">If you have any questions, please reply to this email or contact our support team.</p>
								</div>
								<div class="footer">
									<p>Need help? Contact us at support@revivallocator.com</p>
									<p>&copy; 2025 Revival Locator. All rights reserved.</p>
								</div>
							</div>
						</body>
						</html>
					`;
				}

				if (subject && html) {
					await sendEmail(organizer.email, subject, html);
					console.log(
						`Status update email sent to ${organizer.email} for event ${event._id}`,
					);
				}
			}
		}

		res.json(event);
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
