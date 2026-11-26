import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

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

export async function GET() {
  try {
    await dbConnect();
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Unable to load contact messages:", error);
    return NextResponse.json(
      { message: "Unable to load contact messages." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject = "", message, website = "" } = body ?? {};

    if (website) {
      return NextResponse.json(
        { message: "Invalid submission." },
        { status: 400 }
      );
    }

    if (
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
      cleanSubject.length > 150 ||
      cleanMessage.length < 10 ||
      cleanMessage.length > 3000
    ) {
      return NextResponse.json(
        { message: "Please check your form information." },
        { status: 400 }
      );
    }

    if (cleanSubject && cleanSubject.length < 3) {
      return NextResponse.json(
        { message: "Please check your form information." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await dbConnect();
    await Contact.create({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipient = process.env.CONTACT_TO_EMAIL;
    const smtpConfigured =
      smtpHost &&
      smtpUser &&
      smtpPass &&
      recipient &&
      [465, 587].includes(smtpPort);

    let notificationSent = false;

    if (smtpConfigured) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      const safeName = escapeHtml(cleanName);
      const safeEmail = escapeHtml(cleanEmail);
      const safeSubject = escapeHtml(cleanSubject || "No subject");
      const safeMessage = escapeHtml(cleanMessage);

      try {
        await transporter.sendMail({
          from: `"Al-Shifa Website" <${smtpUser}>`,
          to: recipient,
          replyTo: { name: cleanName, address: cleanEmail },
          subject: `New Website Inquiry: ${cleanSubject || "No subject"}`,
          text: `New Contact Message - Al-Shifa Animal Science\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nSubject: ${cleanSubject || "No subject"}\n\nMessage:\n${cleanMessage}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#243b53;line-height:1.7">
              <div style="background:#166534;padding:25px;border-radius:12px 12px 0 0">
                <h2 style="color:white;margin:0">Al-Shifa Animal Science</h2>
                <p style="color:#dcfce7;margin:5px 0 0">New Website Contact Message</p>
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
        notificationSent = true;
      } catch (error) {
        console.error("Contact email notification failed:", error);
      }
    } else {
      console.error("Email configuration is missing or invalid.");
    }

    return NextResponse.json(
      {
        success: true,
        notificationSent,
        message: notificationSent
          ? "Your message has been sent successfully. Thank you for contacting Al-Shifa!"
          : "Your message was received, but the email notification could not be sent.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to receive your message. Please try again later." },
      { status: 500 }
    );
  }
}
