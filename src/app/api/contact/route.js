
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, subject, message, website } = body;

    // Basic spam protection
    if (website) {
      return NextResponse.json(
        { message: "Invalid submission." },
        { status: 400 }
      );
    }

    // Validation
    if (
      !name ||
      !email ||
      !subject ||
      !message ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    if (
      cleanName.length < 2 ||
      cleanName.length > 80 ||
      cleanEmail.length > 254 ||
      cleanSubject.length < 3 ||
      cleanSubject.length > 150 ||
      cleanMessage.length < 10 ||
      cleanMessage.length > 3000
    ) {
      return NextResponse.json(
        { message: "Please check your form information." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // SMTP Configuration
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipient = process.env.CONTACT_TO_EMAIL;

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPass ||
      !recipient ||
      ![465, 587].includes(smtpPort)
    ) {
      console.error("Email configuration is missing or invalid.");

      return NextResponse.json(
        { message: "Email service is not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeSubject = escapeHtml(cleanSubject);
    const safeMessage = escapeHtml(cleanMessage);

    await transporter.sendMail({
      from: `"Al-Shifa Website" <${smtpUser}>`,

      to: recipient,

      replyTo: {
        name: cleanName,
        address: cleanEmail,
      },

      subject: `New Website Inquiry: ${cleanSubject}`,

      text: `
New Contact Message - Al-Shifa Animal Science

Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}

Message:
${cleanMessage}
      `,

      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#243b53;line-height:1.7">

          <div style="background:#166534;padding:25px;border-radius:12px 12px 0 0">
            <h2 style="color:white;margin:0">
              Al-Shifa Animal Science
            </h2>
            <p style="color:#dcfce7;margin:5px 0 0">
              New Website Contact Message
            </p>
          </div>

          <div style="padding:25px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 12px 12px">

            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>

            <hr style="border:0;border-top:1px solid #e5e7eb;margin:20px 0"/>

            <h3>Message:</h3>

            <p style="white-space:pre-wrap">${safeMessage}</p>

            <hr style="border:0;border-top:1px solid #e5e7eb;margin:20px 0"/>

            <p style="font-size:12px;color:#64748b">
              This message was submitted through the Al-Shifa Animal Science website.
            </p>

          </div>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
