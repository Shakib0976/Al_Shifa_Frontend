import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
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
    
    console.log("📦 Received Data:", body);

    // ⭐ ভ্যালিডেশন চেক
    const requiredFields = ['name', 'slug', 'category', 'categorySlug', 'description', 'price', 'unit'];
    for (const field of requiredFields) {
      if (!body[field]) {
        console.log(`❌ Missing field: ${field}`);
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    // ⭐ price নাম্বারে কনভার্ট
    body.price = Number(body.price);

    // ⭐ highlights অ্যারে কনভার্ট
    if (typeof body.highlights === 'string') {
      body.highlights = body.highlights.split(',').map(h => h.trim()).filter(Boolean);
    }

    const newProduct = await Product.create(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("❌ MongoDB Error:", error); 
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}