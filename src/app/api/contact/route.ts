// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, company, projectType, budget, message } = body;

		// Validate required fields
		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Send email to Kyoto Web Studio
		const { data, error } = await resend.emails.send({
			from: 'Kyoto Web Studio <www.kyotowebstudio.com/>', // Update with your verified domain
			to: ['kyotojim2@gmail.com'], // Your email
			subject: `New Contact Form Submission from ${name}`,
			html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #001F3F; border-bottom: 2px solid #FF851B; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Company:</strong> ${
				company || 'Not provided'
			}</p>
            <p style="margin: 10px 0;"><strong>Project Type:</strong> ${
				projectType || 'Not specified'
			}</p>
            <p style="margin: 10px 0;"><strong>Budget:</strong> ${
				budget || 'Not specified'
			}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from the contact form at kyotowebstudio.com
          </p>
        </div>
      `,
			replyTo: email,
		});

		if (error) {
			console.error('Resend error:', error);
			return NextResponse.json(
				{ error: 'Failed to send email' },
				{ status: 500 }
			);
		}

		// Send auto-reply to the user
		try {
			await resend.emails.send({
				from: 'Kyoto Web Studio <onboarding@resend.dev>', // Update with your verified domain
				to: [email],
				subject: 'Thank you for contacting Kyoto Web Studio',
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #001F3F; padding: 30px; text-align: center;">
              <h1 style="color: #fff; margin: 0;">Kyoto Web Studio</h1>
            </div>
            
            <div style="padding: 30px;">
              <h2 style="color: #001F3F;">Thank you for your inquiry!</h2>
              
              <p>Dear ${name},</p>
              
              <p>We have received your message and appreciate your interest in our services. 
              Our team will review your inquiry and get back to you within 24 hours.</p>
              
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #4F46E5; margin-top: 0;">What happens next?</h3>
                <ul style="color: #666;">
                  <li>We'll review your project requirements</li>
                  <li>Our team will prepare a customized proposal</li>
                  <li>We'll schedule a consultation call if needed</li>
                </ul>
              </div>
              
              <p>In the meantime, feel free to explore our portfolio at 
              <a href="https://kyotowebstudio.com" style="color: #FF851B;">kyotowebstudio.com</a></p>
              
              <p style="margin-top: 30px;">Best regards,<br>
              <strong>Kyoto Web Studio Team</strong></p>
            </div>
            
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
              <p>Kyoto Web Studio | Kyoto, Japan<br>
              hello@kyotowebstudio.com</p>
            </div>
          </div>
        `,
			});
		} catch (autoReplyError) {
			// Log error but don't fail the main request
			console.error('Auto-reply error:', autoReplyError);
		}

		return NextResponse.json(
			{ message: 'Email sent successfully' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Contact form error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
