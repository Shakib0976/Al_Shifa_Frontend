import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { isAdminAuthenticated } from '@/lib/admin-auth';

function redirectToPath(request, path) {
  const response = NextResponse.redirect(new URL(path, request.url), 303);
  response.headers.set('Location', path);
  return response;
}

function redirectToProduct(request, slug, error) {
  const path = `/admin/products/${encodeURIComponent(slug)}?error=${encodeURIComponent(error)}`;
  return redirectToPath(request, path);
}

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

export async function PUT(request, { params }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

export async function DELETE(request, { params }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

export async function POST(request, { params }) {
  const { slug } = await params;

  if (!(await isAdminAuthenticated())) {
    return redirectToPath(request, '/login?error=unauthorized');
  }

  try {
    await dbConnect();
    const formData = await request.formData();

    if (formData.get('_action') === 'delete') {
      const deleted = await Product.findOneAndDelete({ slug });

      if (!deleted) {
        return redirectToProduct(request, slug, 'Product not found.');
      }

      return redirectToPath(request, '/admin/products');
    }

    const highlights = String(formData.get('highlights') || '')
      .split(',')
      .map((highlight) => highlight.trim())
      .filter(Boolean);
    const body = {
      name: String(formData.get('name') || '').trim(),
      slug: String(formData.get('slug') || '').trim(),
      category: String(formData.get('category') || '').trim(),
      categorySlug: String(formData.get('categorySlug') || '').trim(),
      description: String(formData.get('description') || '').trim(),
      price: Number(formData.get('price')),
      unit: String(formData.get('unit') || '').trim(),
      icon: String(formData.get('icon') || '').trim(),
      highlights,
    };

    const updatedProduct = await Product.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return redirectToProduct(request, slug, 'Product not found.');
    }

    return redirectToPath(request, '/admin/products');
  } catch (error) {
    console.error('Unable to process product form:', error);
    return redirectToProduct(request, slug, error.message || 'Unable to save product.');
  }
}