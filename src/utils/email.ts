import axios from "axios";

export const sendEmail = async (to: string, subject: string, html: string) => {
	try {
		const response = await axios.post(
			"https://api.brevo.com/v3/smtp/email",
			{
				sender: {
					name: "Revival Locator",
					email: "lms.techcrush@gmail.com",
				},
				to: [{ email: to }],
				subject,
				htmlContent: html,
			},
			{
				headers: {
					"api-key": process.env.BREVO_API_KEY!,
					"Content-Type": "application/json",
				},
			},
		);

		return {
			success: true,
			messageId: response.data.messageId,
		};
	} catch (error: any) {
		console.error("Brevo error:", error.response?.data || error.message);
		throw error;
	}
};
