import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';

export async function GET() {
  try {
    await dbConnect();
    const news = await News.find({}).sort({ date: -1 }); // নতুন নিউজ আগে
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}