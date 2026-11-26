import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import News from '@/models/News';
import Contact from '@/models/Contact';
import Category from '@/models/Category';

export async function GET() {
  try {
    await dbConnect();

    const [
      productCount,
      newsCount,
      messageCount,
      categoryCount,
      recentProducts,
      recentMessages,
    ] = await Promise.all([
      Product.countDocuments(),
      News.countDocuments(),
      Contact.countDocuments(),
      Category.countDocuments(),
      Product.find().sort({ createdAt: -1 }).limit(3).select("name price slug"),
      Contact.find().sort({ createdAt: -1 }).limit(3).select("name email message"),
    ]);

    return NextResponse.json({
      counts: {
        products: productCount,
        news: newsCount,
        messages: messageCount,
        categories: categoryCount,
      },
      recentProducts,
      recentMessages,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}