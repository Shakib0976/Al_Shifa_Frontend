import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET() {
  try {
    await dbConnect();
    const news = await News.find({}).sort({ date: -1 });
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await request.json();
    const newNews = await News.create(body);
    return NextResponse.json(newNews, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}