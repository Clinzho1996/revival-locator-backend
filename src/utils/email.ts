import dotenv from "dotenv";
import { Resend } from "resend";
dotenv.config();

if (!process.env.RESEND_API_KEY) {
	throw new Error("RESEND_API_KEY is not defined");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, html: string) => {
	return await resend.emails.send({
		from: "Revival Locator <no-reply@kuditrak.com>",
		to,
		subject,
		html,
	});
};
