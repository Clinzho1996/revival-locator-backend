import { Request, Response } from "express";
import { sendEmail } from "../utils/email";

export const contactOrganizer = async (req: Request, res: Response) => {
	const { email, message } = req.body;

	await sendEmail(
		email,
		"New Message from Revival Locator",
		`<p>${message}</p>`,
	);

	res.json({ message: "Email sent" });
};
