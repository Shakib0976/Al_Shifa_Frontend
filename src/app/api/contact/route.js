import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

// সব মেসেজ আনার জন্য (GET)
export async function GET() {
  try {
    await dbConnect();
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// নতুন মেসেজ সেভ করার জন্য (POST)
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const newMessage = await Contact.create(body);
    return NextResponse.json({ message: "Message sent successfully!", data: newMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}