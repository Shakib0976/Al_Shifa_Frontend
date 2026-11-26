import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';
import { isAdminAuthenticated } from '@/lib/admin-auth';

function redirectToPath(request, path) {
  const response = NextResponse.redirect(new URL(path, request.url), 303);
  response.headers.set('Location', path);
  return response;
}

function redirectToNews(request, slug, error) {
  const path = `/admin/news/${encodeURIComponent(slug)}?error=${encodeURIComponent(error)}`;
  return redirectToPath(request, path);
}

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
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

export async function POST(request, { params }) {
  const { slug } = await params;

  if (!(await isAdminAuthenticated())) {
    return redirectToPath(request, '/login?error=unauthorized');
  }

  try {
    await dbConnect();
    const formData = await request.formData();

    if (formData.get('_action') === 'delete') {
      const deleted = await News.findOneAndDelete({ slug });

      if (!deleted) {
        return redirectToNews(request, slug, 'News article not found.');
      }

      return redirectToPath(request, '/admin/news');
    }

    const body = {
      slug: String(formData.get('slug') || '').trim(),
      title: String(formData.get('title') || '').trim(),
      category: String(formData.get('category') || '').trim(),
      date: String(formData.get('date') || '').trim(),
      author: String(formData.get('author') || '').trim(),
      excerpt: String(formData.get('excerpt') || '').trim(),
      image: {
        src: String(formData.get('imageSrc') || '').trim(),
        alt: String(formData.get('imageAlt') || '').trim(),
      },
    };

    const updatedNews = await News.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedNews) {
      return redirectToNews(request, slug, 'News article not found.');
    }

    return redirectToPath(request, '/admin/news');
  } catch (error) {
    console.error('Unable to process news form:', error);
    return redirectToNews(request, slug, error.message || 'Unable to save news article.');
  }
}