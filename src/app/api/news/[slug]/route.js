import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const item = await News.findOne({ slug });
    if (!item) return NextResponse.json({ error: "News not found" }, { status: 404 });
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const body = await request.json();
    const updated = await News.findOneAndUpdate({ slug }, body, { new: true, runValidators: true });
    if (!updated) return NextResponse.json({ error: "News not found" }, { status: 404 });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const deleted = await News.findOneAndDelete({ slug });
    if (!deleted) return NextResponse.json({ error: "News not found" }, { status: 404 });
    return NextResponse.json({ message: "News deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}