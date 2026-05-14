// utils/emailTemplates.ts
export const getEventApprovedEmail = (organizerName: string, event: any) => ({
	subject: `✅ Your Event "${event.title}" Has Been Approved!`,
	html: `
		<!DOCTYPE html>
		<html>
		<head>
			<meta name="color-scheme" content="light only">
			<meta name="supported-color-schemes" content="light">
			<style>
				/* Force light mode only */
				body, .container, .content, .event-details, .footer {
					color-scheme: light only;
					-ms-text-size-adjust: 100%;
					-webkit-text-size-adjust: 100%;
				}
				body { 
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
					line-height: 1.6; 
					color: #1a1a1a; 
					background-color: #f5f5f5;
					margin: 0;
					padding: 0;
				}
				.container { 
					max-width: 600px; 
					margin: 0 auto; 
					padding: 20px; 
					background-color: #ffffff;
				}
				.header { 
					text-align: center; 
					padding: 30px 20px; 
					background: linear-gradient(135deg, #B91C1C, #7F1D1D); 
					color: #ffffff; 
					border-radius: 12px 12px 0 0; 
				}
				.header h1 { 
					margin: 0; 
					font-size: 28px; 
					font-weight: bold;
				}
				.header p { 
					margin: 10px 0 0; 
					opacity: 0.9; 
					font-size: 14px;
				}
				.logo {
					margin-bottom: 15px;
				}
				.logo img {
					max-width: 80px;
					height: auto;
					background: #ffffff;
					border-radius: 50%;
					padding: 8px;
				}
				.content { 
					padding: 30px; 
					background: #f9f9f9; 
					border-radius: 0 0 12px 12px;
				}
				.event-details { 
					background: #ffffff; 
					padding: 20px; 
					border-radius: 12px; 
					margin: 20px 0; 
					border-left: 4px solid #22C55E; 
					box-shadow: 0 2px 8px rgba(0,0,0,0.05);
				}
				.button { 
					display: inline-block; 
					padding: 12px 28px; 
					background: #B91C1C; 
					color: #ffffff; 
					text-decoration: none; 
					border-radius: 8px; 
					font-weight: 600;
					margin: 10px 0;
				}
				.button:hover { background: #7F1D1D; }
				.social-links {
					margin: 20px 0;
					text-align: center;
				}
				.social-icon {
					display: inline-block;
					margin: 0 8px;
					width: 36px;
					height: 36px;
					text-decoration: none;
					vertical-align: middle;
				}
				.social-icon svg {
					width: 36px;
					height: 36px;
					border-radius: 50%;
				}
				.footer { 
					text-align: center; 
					padding: 20px; 
					font-size: 12px; 
					color: #6b7280; 
					border-top: 1px solid #e5e7eb;
					margin-top: 20px;
					background: #ffffff;
				}
				.copyright {
					font-size: 11px;
					color: #9ca3af;
					margin-top: 10px;
				}
				@media only screen and (max-width: 480px) {
					.container { padding: 10px; }
					.content { padding: 20px; }
					h2 { font-size: 20px; }
				}
			</style>
		</head>
		<body style="margin: 0; padding: 0; background-color: #f5f5f5;">
			<div class="container">
				<div class="header">
					<div class="logo">
						<img src="https://revival-locator.vercel.app/images/logo.png" alt="Revival Locator" style="max-width: 60px; height: auto; background: #ffffff; border-radius: 50%; padding: 8px;">
					</div>
					<h1>Event Approved! 🎉</h1>
					<p>Your event is now live</p>
				</div>
				<div class="content">
					<h2 style="margin-top: 0;">Hello ${organizerName},</h2>
					<p>Great news! Your event has been reviewed and <strong style="color: #22C55E;">APPROVED</strong> by our team.</p>
					
					<div class="event-details">
						<h3 style="margin-top: 0; color: #B91C1C;">${event.title}</h3>
						<p><strong>📅 Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
						<p><strong>📍 Location:</strong> ${typeof event.location === "object" ? event.location.address + ", " + event.location.city : event.location}</p>
						<p><strong>👥 Attendees:</strong> ${event.attendees || 0} registered</p>
						<p><strong>📊 Status:</strong> <span style="color: #22C55E; font-weight: bold;">● Approved</span></p>
					</div>
					
					<p>Your event is now live and visible to thousands of believers looking for their next divine encounter!</p>
					
					<p><strong>📌 What happens next?</strong></p>
					<ul>
						<li>✅ Believers can now discover and register for your event</li>
						<li>📈 Track interest and registrations in your dashboard</li>
						<li>📧 You'll receive notifications when people show interest</li>
					</ul>
					
					<div style="text-align: center;">
						<a href="https://revivallocator.com/my-events" class="button">View Your Events</a>
					</div>
					
					<p style="margin-top: 20px;">✨ <strong>Pro Tip:</strong> Share your event on social media to reach even more people!</p>
				</div>
				
				<div class="footer">
					<div class="social-links">
						<p style="margin-bottom: 12px; font-weight: 600; color: #374151;">Follow us for updates</p>
						
						<!-- Instagram -->
						<a href="https://www.instagram.com/revivallocatorng" class="social-icon" target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
								<circle cx="12" cy="12" r="11" fill="url(#instaGradient)"/>
								<rect x="7" y="7" width="10" height="10" rx="2" fill="none" stroke="white" stroke-width="1.5"/>
								<circle cx="12" cy="12" r="2.5" fill="none" stroke="white" stroke-width="1.5"/>
								<circle cx="16.5" cy="7.5" r="1" fill="white"/>
								<defs>
									<linearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
										<stop offset="0%" style="stop-color:#F58529"/>
										<stop offset="50%" style="stop-color:#DD2A7B"/>
										<stop offset="100%" style="stop-color:#8134AF"/>
									</linearGradient>
								</defs>
							</svg>
						</a>
						
						<!-- X (Twitter) -->
						<a href="https://x.com/RevivalLocator" class="social-icon" target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
								<circle cx="12" cy="12" r="11" fill="#000000"/>
								<path d="M17 8.5C16.5 8.8 15.9 9 15.3 9.1C15.8 8.7 16.2 8.2 16.4 7.5C15.9 7.8 15.3 8 14.7 8.1C14.2 7.6 13.5 7.3 12.7 7.3C11.2 7.3 10 8.5 10 10C10 10.3 10 10.5 10.1 10.8C7.8 10.7 5.8 9.6 4.4 7.9C4.1 8.4 4 8.9 4 9.5C4 10.6 4.6 11.6 5.5 12.2C5.1 12.2 4.7 12.1 4.4 11.9C4.4 12.9 5.1 13.8 6.1 14.2C5.8 14.3 5.5 14.4 5.2 14.4C5 14.4 4.8 14.3 4.6 14.3C4.9 15.2 5.7 15.9 6.7 16C6 16.5 5.2 16.8 4.3 16.8C4 16.8 3.7 16.8 3.5 16.7C4.3 17.4 5.3 17.8 6.4 17.8C12.7 17.8 16.1 12.5 16.1 8C16.1 7.8 16.1 7.7 16.1 7.5C16.6 7.1 17 6.6 17.3 6C16.8 6.2 16.3 6.4 15.8 6.5C16.4 6.1 16.8 5.6 17 5C16.5 5.3 15.9 5.6 15.3 5.8C14.8 5.3 14.2 5 13.5 5C12.1 5 11 6.1 11 7.5C11 7.8 11 8 11.1 8.2C8.6 8.1 6.4 7.1 4.9 5.5C4.5 6.1 4.3 6.8 4.3 7.5C4.3 8.9 5 10.2 6.2 11C5.8 11 5.5 10.9 5.2 10.8C5.2 11.5 5.6 12.2 6.2 12.7C5.9 12.7 5.6 12.7 5.4 12.6C5.6 13.4 6.2 14 6.9 14.4C6.4 14.6 5.9 14.7 5.3 14.7C5 14.7 4.7 14.7 4.5 14.6C5.2 15.2 6.1 15.6 7 15.6C13.2 15.6 16.6 10.4 16.6 6.5C16.6 6.3 16.6 6.2 16.6 6C17 5.7 17.3 5.3 17.6 4.9C17.3 5.1 17 5.2 16.6 5.3" fill="white"/>
							</svg>
						</a>
						
						<!-- Facebook -->
						<a href="https://www.facebook.com/profile.php?id=61573704865289" class="social-icon" target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
								<circle cx="12" cy="12" r="11" fill="#1877F2"/>
								<path d="M14.5 8.5H16.5V6C16.2 5.9 15.2 5.8 14.2 5.8C12 5.8 10.5 7.2 10.5 9.5V11.5H8.5V14.5H10.5V22H13.5V14.5H16L16.5 11.5H13.5V10C13.5 9 13.8 8.5 14.5 8.5Z" fill="white"/>
							</svg>
						</a>
					</div>
					<p style="margin: 16px 0 8px;">Need help? Contact us at <a href="mailto:support@revivallocator.com" style="color: #B91C1C; text-decoration: none;">support@revivallocator.com</a></p>
					<div class="copyright">
						<p>&copy; ${new Date().getFullYear()} Revival Locator. All rights reserved.</p>
						<p style="font-size: 10px;">Connecting believers to divine encounters</p>
					</div>
				</div>
			</div>
		</body>
		</html>
	`,
});

export const getEventDeclinedEmail = (organizerName: string, event: any) => ({
	subject: `❌ Update on Your Event "${event.title}"`,
	html: `
		<!DOCTYPE html>
		<html>
		<head>
			<meta name="color-scheme" content="light only">
			<meta name="supported-color-schemes" content="light">
			<style>
				body { 
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
					line-height: 1.6; 
					color: #1a1a1a; 
					background-color: #f5f5f5;
					margin: 0;
					padding: 0;
				}
				.container { 
					max-width: 600px; 
					margin: 0 auto; 
					padding: 20px; 
					background-color: #ffffff;
				}
				.header { 
					text-align: center; 
					padding: 30px 20px; 
					background: linear-gradient(135deg, #B91C1C, #7F1D1D); 
					color: #ffffff; 
					border-radius: 12px 12px 0 0; 
				}
				.header h1 { margin: 0; font-size: 28px; font-weight: bold; }
				.header p { margin: 10px 0 0; opacity: 0.9; font-size: 14px; }
				.logo { margin-bottom: 15px; }
				.logo img { max-width: 60px; height: auto; background: #ffffff; border-radius: 50%; padding: 8px; }
				.content { padding: 30px; background: #f9f9f9; border-radius: 0 0 12px 12px; }
				.event-details { 
					background: #ffffff; 
					padding: 20px; 
					border-radius: 12px; 
					margin: 20px 0; 
					border-left: 4px solid #EF4444; 
					box-shadow: 0 2px 8px rgba(0,0,0,0.05);
				}
				.button { 
					display: inline-block; 
					padding: 12px 28px; 
					background: #B91C1C; 
					color: #ffffff; 
					text-decoration: none; 
					border-radius: 8px; 
					font-weight: 600;
					margin: 10px 0;
				}
				.social-links { margin: 20px 0; text-align: center; }
				.social-icon {
					display: inline-block;
					margin: 0 8px;
					width: 36px;
					height: 36px;
					text-decoration: none;
					vertical-align: middle;
				}
				.social-icon svg {
					width: 36px;
					height: 36px;
					border-radius: 50%;
				}
				.footer { text-align: center; padding: 20px; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; margin-top: 20px; background: #ffffff; }
				.copyright { font-size: 11px; color: #9ca3af; margin-top: 10px; }
				@media only screen and (max-width: 480px) {
					.container { padding: 10px; }
					.content { padding: 20px; }
				}
			</style>
		</head>
		<body style="margin: 0; padding: 0; background-color: #f5f5f5;">
			<div class="container">
				<div class="header">
					<div class="logo">
						<img src="https://revival-locator.vercel.app/images/logo.png" alt="Revival Locator" style="max-width: 60px; height: auto; background: #ffffff; border-radius: 50%; padding: 8px;">
					</div>
					<h1>Event Update</h1>
					<p>Review completed</p>
				</div>
				<div class="content">
					<h2 style="margin-top: 0;">Hello ${organizerName},</h2>
					<p>We have reviewed your event submission. Unfortunately, it has been <strong style="color: #EF4444;">DECLINED</strong> at this time.</p>
					
					<div class="event-details">
						<h3 style="margin-top: 0; color: #B91C1C;">${event.title}</h3>
						<p><strong>📅 Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
						<p><strong>📍 Location:</strong> ${typeof event.location === "object" ? event.location.address + ", " + event.location.city : event.location}</p>
						<p><strong>📊 Status:</strong> <span style="color: #EF4444; font-weight: bold;">● Not Approved</span></p>
					</div>
					
					<p><strong>Common reasons for decline:</strong></p>
					<ul>
						<li>Incomplete or missing event information</li>
						<li>Event date has already passed</li>
						<li>Content that doesn't align with our community guidelines</li>
						<li>Duplicate event listing</li>
					</ul>
					
					<p>You can edit your event and resubmit it for review. Our team will be happy to reconsider your event once the necessary changes are made.</p>
					
					<div style="text-align: center;">
						<a href="https://revivallocator.com/my-events" class="button">Edit & Resubmit</a>
					</div>
					
					<p style="margin-top: 20px;">❓ If you have any questions, please reply to this email or contact our support team.</p>
				</div>
				
				<div class="footer">
					<div class="social-links">
						<p style="margin-bottom: 12px; font-weight: 600; color: #374151;">Follow us for updates</p>
						
						<!-- Instagram -->
						<a href="https://www.instagram.com/revivallocatorng" class="social-icon" target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
								<circle cx="12" cy="12" r="11" fill="url(#instaGradient2)"/>
								<rect x="7" y="7" width="10" height="10" rx="2" fill="none" stroke="white" stroke-width="1.5"/>
								<circle cx="12" cy="12" r="2.5" fill="none" stroke="white" stroke-width="1.5"/>
								<circle cx="16.5" cy="7.5" r="1" fill="white"/>
								<defs>
									<linearGradient id="instaGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
										<stop offset="0%" style="stop-color:#F58529"/>
										<stop offset="50%" style="stop-color:#DD2A7B"/>
										<stop offset="100%" style="stop-color:#8134AF"/>
									</linearGradient>
								</defs>
							</svg>
						</a>
						
						<!-- X (Twitter) -->
						<a href="https://x.com/RevivalLocator" class="social-icon" target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
								<circle cx="12" cy="12" r="11" fill="#000000"/>
								<path d="M17 8.5C16.5 8.8 15.9 9 15.3 9.1C15.8 8.7 16.2 8.2 16.4 7.5C15.9 7.8 15.3 8 14.7 8.1C14.2 7.6 13.5 7.3 12.7 7.3C11.2 7.3 10 8.5 10 10C10 10.3 10 10.5 10.1 10.8C7.8 10.7 5.8 9.6 4.4 7.9C4.1 8.4 4 8.9 4 9.5C4 10.6 4.6 11.6 5.5 12.2C5.1 12.2 4.7 12.1 4.4 11.9C4.4 12.9 5.1 13.8 6.1 14.2C5.8 14.3 5.5 14.4 5.2 14.4C5 14.4 4.8 14.3 4.6 14.3C4.9 15.2 5.7 15.9 6.7 16C6 16.5 5.2 16.8 4.3 16.8C4 16.8 3.7 16.8 3.5 16.7C4.3 17.4 5.3 17.8 6.4 17.8C12.7 17.8 16.1 12.5 16.1 8C16.1 7.8 16.1 7.7 16.1 7.5C16.6 7.1 17 6.6 17.3 6C16.8 6.2 16.3 6.4 15.8 6.5C16.4 6.1 16.8 5.6 17 5C16.5 5.3 15.9 5.6 15.3 5.8C14.8 5.3 14.2 5 13.5 5C12.1 5 11 6.1 11 7.5C11 7.8 11 8 11.1 8.2C8.6 8.1 6.4 7.1 4.9 5.5C4.5 6.1 4.3 6.8 4.3 7.5C4.3 8.9 5 10.2 6.2 11C5.8 11 5.5 10.9 5.2 10.8C5.2 11.5 5.6 12.2 6.2 12.7C5.9 12.7 5.6 12.7 5.4 12.6C5.6 13.4 6.2 14 6.9 14.4C6.4 14.6 5.9 14.7 5.3 14.7C5 14.7 4.7 14.7 4.5 14.6C5.2 15.2 6.1 15.6 7 15.6C13.2 15.6 16.6 10.4 16.6 6.5C16.6 6.3 16.6 6.2 16.6 6C17 5.7 17.3 5.3 17.6 4.9C17.3 5.1 17 5.2 16.6 5.3" fill="white"/>
							</svg>
						</a>
						
						<!-- Facebook -->
						<a href="https://www.facebook.com/profile.php?id=61573704865289" class="social-icon" target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
								<circle cx="12" cy="12" r="11" fill="#1877F2"/>
								<path d="M14.5 8.5H16.5V6C16.2 5.9 15.2 5.8 14.2 5.8C12 5.8 10.5 7.2 10.5 9.5V11.5H8.5V14.5H10.5V22H13.5V14.5H16L16.5 11.5H13.5V10C13.5 9 13.8 8.5 14.5 8.5Z" fill="white"/>
							</svg>
						</a>
					</div>
					<p style="margin: 16px 0 8px;">Need help? Contact us at <a href="mailto:support@revivallocator.com" style="color: #B91C1C; text-decoration: none;">support@revivallocator.com</a></p>
					<div class="copyright">
						<p>&copy; ${new Date().getFullYear()} Revival Locator. All rights reserved.</p>
						<p style="font-size: 10px;">Connecting believers to divine encounters</p>
					</div>
				</div>
			</div>
		</body>
		</html>
	`,
});

// utils/emailTemplates.ts (add this function)
export const getPasswordResetEmail = (name: string, otp: string) => ({
	subject: "🔐 Reset Your Revival Locator Password",
	html: `
		<!DOCTYPE html>
		<html>
		<head>
			<meta name="color-scheme" content="light only">
			<meta name="supported-color-schemes" content="light">
			<style>
				body { 
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
					line-height: 1.6; 
					color: #1a1a1a; 
					background-color: #f5f5f5;
					margin: 0;
					padding: 0;
				}
				.container { 
					max-width: 600px; 
					margin: 0 auto; 
					padding: 20px; 
					background-color: #ffffff;
				}
				.header { 
					text-align: center; 
					padding: 30px 20px; 
					background: linear-gradient(135deg, #B91C1C, #7F1D1D); 
					color: #ffffff; 
					border-radius: 12px 12px 0 0; 
				}
				.header h1 { margin: 0; font-size: 28px; font-weight: bold; }
				.logo { margin-bottom: 15px; }
				.logo img { max-width: 60px; height: auto; background: #ffffff; border-radius: 50%; padding: 8px; }
				.content { padding: 30px; background: #f9f9f9; border-radius: 0 0 12px 12px; }
				.otp-box { 
					background: #ffffff; 
					padding: 20px; 
					border-radius: 12px; 
					margin: 20px 0; 
					text-align: center;
					border: 2px dashed #B91C1C;
				}
				.otp-code {
					font-size: 32px;
					font-weight: bold;
					letter-spacing: 8px;
					color: #B91C1C;
					font-family: monospace;
				}
				.button { 
					display: inline-block; 
					padding: 12px 28px; 
					background: #B91C1C; 
					color: #ffffff; 
					text-decoration: none; 
					border-radius: 8px; 
					font-weight: 600;
					margin: 10px 0;
				}
				.footer { text-align: center; padding: 20px; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; margin-top: 20px; }
				.copyright { font-size: 11px; color: #9ca3af; margin-top: 10px; }
				.social-links { margin: 20px 0; text-align: center; }
				.social-icon {
					display: inline-block;
					margin: 0 8px;
					width: 36px;
					height: 36px;
					text-decoration: none;
					vertical-align: middle;
				}
				.social-icon svg { width: 36px; height: 36px; border-radius: 50%; }
			</style>
		</head>
		<body style="margin: 0; padding: 0; background-color: #f5f5f5;">
			<div class="container">
				<div class="header">
					<div class="logo">
						<img src="https://revival-locator.vercel.app/images/logo.png" alt="Revival Locator">
					</div>
					<h1>Password Reset Request</h1>
				</div>
				<div class="content">
					<h2>Hello ${name},</h2>
					<p>We received a request to reset your password for your Revival Locator account.</p>
					<p>Use the OTP code below to reset your password. This code is valid for <strong>10 minutes</strong>.</p>
					
					<div class="otp-box">
						<p style="margin-bottom: 10px; color: #6b7280;">Your verification code is:</p>
						<div class="otp-code">${otp}</div>
					</div>
					
					<p>If you didn't request this, please ignore this email. Your password will remain unchanged.</p>
					
					<div style="text-align: center; margin-top: 20px;">
						<a href="https://revivallocator.com/reset-password" class="button">Reset Password</a>
					</div>
				</div>
				<div class="footer">
					<div class="social-links">
						<p style="margin-bottom: 12px; font-weight: 600;">Follow us for updates</p>
						<a href="https://www.instagram.com/revivallocatorng" class="social-icon" target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<circle cx="12" cy="12" r="11" fill="url(#instaGradient)"/>
								<rect x="7" y="7" width="10" height="10" rx="2" fill="none" stroke="white" stroke-width="1.5"/>
								<circle cx="12" cy="12" r="2.5" fill="none" stroke="white" stroke-width="1.5"/>
								<circle cx="16.5" cy="7.5" r="1" fill="white"/>
								<defs>
									<linearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
										<stop offset="0%" stop-color="#F58529"/>
										<stop offset="50%" stop-color="#DD2A7B"/>
										<stop offset="100%" stop-color="#8134AF"/>
									</linearGradient>
								</defs>
							</svg>
						</a>
						<a href="https://x.com/RevivalLocator" class="social-icon" target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<circle cx="12" cy="12" r="11" fill="#000000"/>
								<path d="M17 8.5C16.5 8.8 15.9 9 15.3 9.1C15.8 8.7 16.2 8.2 16.4 7.5C15.9 7.8 15.3 8 14.7 8.1C14.2 7.6 13.5 7.3 12.7 7.3C11.2 7.3 10 8.5 10 10C10 10.3 10 10.5 10.1 10.8C7.8 10.7 5.8 9.6 4.4 7.9C4.1 8.4 4 8.9 4 9.5C4 10.6 4.6 11.6 5.5 12.2C5.1 12.2 4.7 12.1 4.4 11.9C4.4 12.9 5.1 13.8 6.1 14.2C5.8 14.3 5.5 14.4 5.2 14.4C5 14.4 4.8 14.3 4.6 14.3C4.9 15.2 5.7 15.9 6.7 16C6 16.5 5.2 16.8 4.3 16.8C4 16.8 3.7 16.8 3.5 16.7C4.3 17.4 5.3 17.8 6.4 17.8C12.7 17.8 16.1 12.5 16.1 8C16.1 7.8 16.1 7.7 16.1 7.5C16.6 7.1 17 6.6 17.3 6C16.8 6.2 16.3 6.4 15.8 6.5C16.4 6.1 16.8 5.6 17 5C16.5 5.3 15.9 5.6 15.3 5.8C14.8 5.3 14.2 5 13.5 5C12.1 5 11 6.1 11 7.5C11 7.8 11 8 11.1 8.2C8.6 8.1 6.4 7.1 4.9 5.5C4.5 6.1 4.3 6.8 4.3 7.5C4.3 8.9 5 10.2 6.2 11C5.8 11 5.5 10.9 5.2 10.8C5.2 11.5 5.6 12.2 6.2 12.7C5.9 12.7 5.6 12.7 5.4 12.6C5.6 13.4 6.2 14 6.9 14.4C6.4 14.6 5.9 14.7 5.3 14.7C5 14.7 4.7 14.7 4.5 14.6C5.2 15.2 6.1 15.6 7 15.6C13.2 15.6 16.6 10.4 16.6 6.5C16.6 6.3 16.6 6.2 16.6 6C17 5.7 17.3 5.3 17.6 4.9C17.3 5.1 17 5.2 16.6 5.3" fill="white"/>
							</svg>
						</a>
						<a href="https://www.facebook.com/profile.php?id=61573704865289" class="social-icon" target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<circle cx="12" cy="12" r="11" fill="#1877F2"/>
								<path d="M14.5 8.5H16.5V6C16.2 5.9 15.2 5.8 14.2 5.8C12 5.8 10.5 7.2 10.5 9.5V11.5H8.5V14.5H10.5V22H13.5V14.5H16L16.5 11.5H13.5V10C13.5 9 13.8 8.5 14.5 8.5Z" fill="white"/>
							</svg>
						</a>
					</div>
					<p>Need help? Contact us at <a href="mailto:support@revivallocator.com" style="color: #B91C1C;">support@revivallocator.com</a></p>
					<div class="copyright">
						<p>&copy; ${new Date().getFullYear()} Revival Locator. All rights reserved.</p>
						<p style="font-size: 10px;">Connecting believers to divine encounters</p>
					</div>
				</div>
			</div>
		</body>
		</html>
	`,
});
