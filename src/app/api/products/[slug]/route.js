import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// ১. নির্দিষ্ট প্রোডাক্ট দেখার জন্য (GET)
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    
    const product = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ২. প্রোডাক্ট আপডেট করার জন্য (PUT)
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const body = await request.json();

    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// ৩. প্রোডাক্ট ডিলিট করার জন্য (DELETE)
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const deleted = await Product.findOneAndDelete({ slug });

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}