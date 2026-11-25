import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const newsItem = await News.findOne({ slug });

    if (!newsItem) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(newsItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}