// app/api/send-email.tsx
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email, firstname, lastname, company, message, phone } = data;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: '"RedNinjas LTD" <no-reply@redninjas.dev>',
    to: 'info@redninjas.dev',
    subject: 'New Contact Form Submission',
    html: `
      <style>
        h4 { color: #333; }
        ul { list-style: none; padding: 0; }
        li { margin-bottom: 10px; }
        strong { color: #000; }
        .footer { margin-top: 20px; font-size: 0.9em; }
      </style>
      <div>
        <h4>New Contact Form Submission</h4>

        <p>You have received a new submission from your contact form. Here are the details:</p>

        <ul>
          <li><strong>First Name:</strong> ${firstname}</li>
          <li><strong>Last Name:</strong> ${lastname}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone ? phone : 'Not provided'}</li>
          <li><strong>Company:</strong> ${company ? company : 'Not provided'}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>

        <p class="footer">Please respond to this email at your earliest convenience to follow up with the inquiry.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: 'Failed to send email' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
