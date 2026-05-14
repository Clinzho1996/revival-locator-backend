// utils/emailTemplates.ts
export const getEventApprovedEmail = (organizerName: string, event: any) => ({
	subject: `✅ Your Event "${event.title}" Has Been Approved!`,
	html: `
		<!DOCTYPE html>
		<html>
		<head>
			<meta name="color-scheme" content="light dark">
			<meta name="supported-color-schemes" content="light dark">
			<style>
				/* Reset for email clients */
				body, .container, .content, .event-details, .footer {
					margin: 0;
					padding: 0;
				}
				body { 
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
					line-height: 1.6; 
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
				.logo img { max-width: 100px; height: auto; background-color: #ffffff; border-radius: 10px; padding: 3px; }
				.content { 
					padding: 30px; 
					background-color: #f9f9f9; 
					border-radius: 0 0 12px 12px;
				}
				.event-details { 
					background-color: #ffffff; 
					padding: 20px; 
					border-radius: 12px; 
					margin: 20px 0; 
					border-left: 4px solid #22C55E; 
				}
				.button { 
					display: inline-block; 
					padding: 12px 28px; 
					background-color: #B91C1C; 
					color: #ffffff; 
					text-decoration: none; 
					border-radius: 8px; 
					font-weight: 600;
					margin: 10px 0;
				}
				.social-links {
					margin: 20px 0;
					text-align: center;
				}
				.social-icon {
					display: inline-block;
					margin: 0 6px;
					width: 36px;
					height: 36px;
					text-decoration: none;
					vertical-align: middle;
				}
				.footer { 
					text-align: center; 
					padding: 20px; 
					font-size: 12px; 
					color: #6b7280; 
					border-top: 1px solid #e5e7eb;
					margin-top: 20px;
					background-color: #ffffff;
				}
				.copyright {
					font-size: 11px;
					color: #9ca3af;
					margin-top: 10px;
				}
				a {
					color: #B91C1C;
					text-decoration: none;
				}
				/* Dark mode overrides */
				@media (prefers-color-scheme: dark) {
					body { background-color: #1a1a1a; }
					.container { background-color: #1a1a1a; }
					.content { background-color: #2d2d2d; }
					.event-details { background-color: #1a1a1a; border-left-color: #4CAF50; }
					.footer { background-color: #1a1a1a; border-top-color: #333; }
					.social-icon svg circle { stroke: none; }
					h1, h2, h3, p, li { color: #e0e0e0; }
					.event-details h3 { color: #e0e0e0; }
					.content p, .content li { color: #b0b0b0; }
					.footer p { color: #888; }
					.copyright { color: #666; }
					.social-icon {
						background: transparent;
					}
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
						<img src="https://revival-locator.vercel.app/images/logo.png" alt="Revival Locator" style="max-width: 60px; height: auto; background-color: #ffffff; border-radius: 50%; padding: 8px;">
					</div>
					<h1>Event Approved! 🎉</h1>
					<p>Your event is now live</p>
				</div>
				<div class="content">
					<h2 style="margin-top: 0; color: #1a1a1a;">Hello ${organizerName},</h2>
					<p style="color: #4a4a4a;">Great news! Your event has been reviewed and <strong style="color: #22C55E;">APPROVED</strong> by our team.</p>
					
					<div class="event-details">
						<h3 style="margin-top: 0; color: #B91C1C;">${event.title}</h3>
						<p style="color: #555;"><strong>📅 Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
						<p style="color: #555;"><strong>📍 Location:</strong> ${typeof event.location === "object" ? event.location.address + ", " + event.location.city : event.location}</p>
						<p style="color: #555;"><strong>👥 Attendees:</strong> ${event.attendees || 0} registered</p>
						<p style="color: #555;"><strong>📊 Status:</strong> <span style="color: #22C55E; font-weight: bold;">● Approved</span></p>
					</div>
					
					<p style="color: #4a4a4a;">Your event is now live and visible to thousands of believers looking for their next divine encounter!</p>
					
					<p style="color: #4a4a4a;"><strong>📌 What happens next?</strong></p>
					<ul style="color: #4a4a4a;">
						<li>✅ Believers can now discover and register for your event</li>
						<li>📈 Track interest and registrations in your dashboard</li>
						<li>📧 You'll receive notifications when people show interest</li>
					</ul>
					
					<div style="text-align: center;">
						<a href="https://revivallocator.com/my-events" class="button" style="background-color: #B91C1C; color: #ffffff;">View Your Events</a>
					</div>
					
					<p style="color: #4a4a4a; margin-top: 20px;">✨ <strong>Pro Tip:</strong> Share your event on social media to reach even more people!</p>
				</div>
				
				<div class="footer">
					<div class="social-links">
						<p style="margin-bottom: 12px; font-weight: 600; color: #374151;">Follow us for updates</p>
						
						<!-- Instagram -->
						<a href="https://www.instagram.com/revivallocatorng" class="social-icon" target="_blank" style="display: inline-block; margin: 0 6px; width: 36px; height: 36px; text-decoration: none;">
							<img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" width="36" height="36" style="border-radius: 50%;">
						</a>
						
						<!-- X (Twitter) -->
						<a href="https://x.com/RevivalLocator" class="social-icon" target="_blank" style="display: inline-block; margin: 0 6px; width: 36px; height: 36px; text-decoration: none;">
							<img src="https://abs.twimg.com/responsive-web/client-web/icon-ios.b1fc7285.svg" alt="X" width="36" height="36" style="border-radius: 50%; background-color: #000; padding: 6px;">
						</a>
						
						<!-- Facebook -->
						<a href="https://www.facebook.com/profile.php?id=61573704865289" class="social-icon" target="_blank" style="display: inline-block; margin: 0 6px; width: 36px; height: 36px; text-decoration: none;">
							<img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" width="36" height="36" style="border-radius: 50%;">
						</a>
					</div>
					<p style="margin: 16px 0 8px; color: #6b7280;">Need help? Contact us at <a href="mailto:support@revivallocator.com" style="color: #B91C1C;">support@revivallocator.com</a></p>
					<div class="copyright">
						<p style="color: #9ca3af;">&copy; ${new Date().getFullYear()} Revival Locator. All rights reserved.</p>
						<p style="color: #9ca3af; font-size: 10px;">Connecting believers to divine encounters</p>
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
			<meta name="color-scheme" content="light dark">
			<meta name="supported-color-schemes" content="light dark">
			<style>
				body { 
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
					line-height: 1.6; 
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
				.logo img { max-width: 100px; height: auto; background-color: #ffffff; border-radius: 10px; padding: 3px; }
				.content { padding: 30px; background-color: #f9f9f9; border-radius: 0 0 12px 12px; }
				.event-details { 
					background-color: #ffffff; 
					padding: 20px; 
					border-radius: 12px; 
					margin: 20px 0; 
					border-left: 4px solid #EF4444; 
				}
				.button { 
					display: inline-block; 
					padding: 12px 28px; 
					background-color: #B91C1C; 
					color: #ffffff; 
					text-decoration: none; 
					border-radius: 8px; 
					font-weight: 600;
					margin: 10px 0;
				}
				.social-links { margin: 20px 0; text-align: center; }
				.social-icon {
					display: inline-block;
					margin: 0 6px;
					width: 36px;
					height: 36px;
					text-decoration: none;
					vertical-align: middle;
				}
				.footer { text-align: center; padding: 20px; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; margin-top: 20px; background-color: #ffffff; }
				.copyright { font-size: 11px; color: #9ca3af; margin-top: 10px; }
				a { color: #B91C1C; text-decoration: none; }
				/* Dark mode overrides */
				@media (prefers-color-scheme: dark) {
					body { background-color: #1a1a1a; }
					.container { background-color: #1a1a1a; }
					.content { background-color: #2d2d2d; }
					.event-details { background-color: #1a1a1a; border-left-color: #EF4444; }
					.footer { background-color: #1a1a1a; border-top-color: #333; }
					h1, h2, h3, p, li { color: #e0e0e0; }
					.event-details h3 { color: #e0e0e0; }
					.content p, .content li { color: #b0b0b0; }
					.footer p { color: #888; }
					.copyright { color: #666; }
				}
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
						<img src="https://revival-locator.vercel.app/images/logo.png" alt="Revival Locator" style="max-width: 60px; height: auto; background-color: #ffffff; border-radius: 50%; padding: 8px;">
					</div>
					<h1>Event Update</h1>
					<p>Review completed</p>
				</div>
				<div class="content">
					<h2 style="margin-top: 0; color: #1a1a1a;">Hello ${organizerName},</h2>
					<p style="color: #4a4a4a;">We have reviewed your event submission. Unfortunately, it has been <strong style="color: #EF4444;">DECLINED</strong> at this time.</p>
					
					<div class="event-details">
						<h3 style="margin-top: 0; color: #B91C1C;">${event.title}</h3>
						<p style="color: #555;"><strong>📅 Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
						<p style="color: #555;"><strong>📍 Location:</strong> ${typeof event.location === "object" ? event.location.address + ", " + event.location.city : event.location}</p>
						<p style="color: #555;"><strong>📊 Status:</strong> <span style="color: #EF4444; font-weight: bold;">● Not Approved</span></p>
					</div>
					
					<p style="color: #4a4a4a;"><strong>Common reasons for decline:</strong></p>
					<ul style="color: #4a4a4a;">
						<li>Incomplete or missing event information</li>
						<li>Event date has already passed</li>
						<li>Content that doesn't align with our community guidelines</li>
						<li>Duplicate event listing</li>
					</ul>
					
					<p style="color: #4a4a4a;">You can edit your event and resubmit it for review. Our team will be happy to reconsider your event once the necessary changes are made.</p>
					
					<div style="text-align: center;">
						<a href="https://revivallocator.com/my-events" class="button" style="background-color: #B91C1C; color: #ffffff;">Edit & Resubmit</a>
					</div>
					
					<p style="color: #4a4a4a; margin-top: 20px;">❓ If you have any questions, please reply to this email or contact our support team.</p>
				</div>
				
				<div class="footer">
					<div class="social-links">
						<p style="margin-bottom: 12px; font-weight: 600; color: #374151;">Follow us for updates</p>
						
						<!-- Instagram -->
						<a href="https://www.instagram.com/revivallocatorng" class="social-icon" target="_blank" style="display: inline-block; margin: 0 6px; width: 36px; height: 36px; text-decoration: none;">
							<img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" width="36" height="36" style="border-radius: 50%;">
						</a>
						
						<!-- X (Twitter) -->
						<a href="https://x.com/RevivalLocator" class="social-icon" target="_blank" style="display: inline-block; margin: 0 6px; width: 36px; height: 36px; text-decoration: none;">
							<img src="https://abs.twimg.com/responsive-web/client-web/icon-ios.b1fc7285.svg" alt="X" width="36" height="36" style="border-radius: 50%; background-color: #000; padding: 6px;">
						</a>
						
						<!-- Facebook -->
						<a href="https://www.facebook.com/profile.php?id=61573704865289" class="social-icon" target="_blank" style="display: inline-block; margin: 0 6px; width: 36px; height: 36px; text-decoration: none;">
							<img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" width="36" height="36" style="border-radius: 50%;">
						</a>
					</div>
					<p style="margin: 16px 0 8px; color: #6b7280;">Need help? Contact us at <a href="mailto:support@revivallocator.com" style="color: #B91C1C;">support@revivallocator.com</a></p>
					<div class="copyright">
						<p style="color: #9ca3af;">&copy; ${new Date().getFullYear()} Revival Locator. All rights reserved.</p>
						<p style="color: #9ca3af; font-size: 10px;">Connecting believers to divine encounters</p>
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
			<meta name="color-scheme" content="light dark">
			<meta name="supported-color-schemes" content="light dark">
			<style>
				body { 
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
					line-height: 1.6; 
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
				.logo img { max-width: 100px; height: auto; background-color: #ffffff; border-radius: 10px; padding: 3px; }
				.content { padding: 30px; background-color: #f9f9f9; border-radius: 0 0 12px 12px; }
				.otp-box { 
					background-color: #ffffff; 
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
					background-color: #B91C1C; 
					color: #ffffff; 
					text-decoration: none; 
					border-radius: 8px; 
					font-weight: 600;
					margin: 10px 0;
				}
				.footer { text-align: center; padding: 20px; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; margin-top: 20px; background-color: #ffffff; }
				.copyright { font-size: 11px; color: #9ca3af; margin-top: 10px; }
				.social-links { margin: 20px 0; text-align: center; }
				.social-icon {
					display: inline-block;
					margin: 0 6px;
					width: 36px;
					height: 36px;
					text-decoration: none;
					vertical-align: middle;
				}
				a { color: #B91C1C; text-decoration: none; }
				/* Dark mode overrides */
				@media (prefers-color-scheme: dark) {
					body { background-color: #1a1a1a; }
					.container { background-color: #1a1a1a; }
					.content { background-color: #2d2d2d; }
					.otp-box { background-color: #1a1a1a; border-color: #B91C1C; }
					.footer { background-color: #1a1a1a; border-top-color: #333; }
					h1, h2, h3, p { color: #e0e0e0; }
					.otp-code { color: #B91C1C; }
					.content p { color: #b0b0b0; }
					.footer p { color: #888; }
					.copyright { color: #666; }
				}
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
						<img src="https://revival-locator.vercel.app/images/logo.png" alt="Revival Locator" style="max-width: 60px; height: auto; background-color: #ffffff; border-radius: 50%; padding: 8px;">
					</div>
					<h1>Password Reset Request</h1>
				</div>
				<div class="content">
					<h2 style="margin-top: 0; color: #1a1a1a;">Hello ${name},</h2>
					<p style="color: #4a4a4a;">We received a request to reset your password for your Revival Locator account.</p>
					<p style="color: #4a4a4a;">Use the OTP code below to reset your password. This code is valid for <strong>10 minutes</strong>.</p>
					
					<div class="otp-box">
						<p style="margin-bottom: 10px; color: #6b7280;">Your verification code is:</p>
						<div class="otp-code">${otp}</div>
					</div>
					
					<p style="color: #4a4a4a;">If you didn't request this, please ignore this email. Your password will remain unchanged.</p>
					
					<div style="text-align: center; margin-top: 20px;">
						<a href="https://revivallocator.com/reset-password" class="button" style="background-color: #B91C1C; color: #ffffff;">Reset Password</a>
					</div>
				</div>
				<div class="footer">
					<div class="social-links">
						<p style="margin-bottom: 12px; font-weight: 600; color: #374151;">Follow us for updates</p>
						
						<!-- Instagram -->
						<a href="https://www.instagram.com/revivallocatorng" class="social-icon" target="_blank" style="display: inline-block; margin: 0 6px; width: 36px; height: 36px; text-decoration: none;">
							<img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" width="36" height="36" style="border-radius: 50%;">
						</a>
						
						<!-- X (Twitter) -->
						<a href="https://x.com/RevivalLocator" class="social-icon" target="_blank" style="display: inline-block; margin: 0 6px; width: 36px; height: 36px; text-decoration: none;">
							<img src="https://abs.twimg.com/responsive-web/client-web/icon-ios.b1fc7285.svg" alt="X" width="36" height="36" style="border-radius: 50%; background-color: #000; padding: 6px;">
						</a>
						
						<!-- Facebook -->
						<a href="https://www.facebook.com/profile.php?id=61573704865289" class="social-icon" target="_blank" style="display: inline-block; margin: 0 6px; width: 36px; height: 36px; text-decoration: none;">
							<img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" width="36" height="36" style="border-radius: 50%;">
						</a>
					</div>
					<p style="margin: 16px 0 8px; color: #6b7280;">Need help? Contact us at <a href="mailto:support@revivallocator.com" style="color: #B91C1C;">support@revivallocator.com</a></p>
					<div class="copyright">
						<p style="color: #9ca3af;">&copy; ${new Date().getFullYear()} Revival Locator. All rights reserved.</p>
						<p style="color: #9ca3af; font-size: 10px;">Connecting believers to divine encounters</p>
					</div>
				</div>
			</div>
		</body>
		</html>
	`,
});
