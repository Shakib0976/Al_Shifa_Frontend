import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { uploadImageToImgBB } from '@/lib/imgbb';

function redirectToPath(request, path) {
  const response = NextResponse.redirect(new URL(path, request.url), 303);
  response.headers.set('Location', path);
  return response;
}

function redirectWithError(request, error) {
  return redirectToPath(
    request,
    `/admin/news/new?error=${encodeURIComponent(error)}`
  );
}

function redirectWithSuccess(request, message) {
  return redirectToPath(
    request,
    `/admin/news?success=${encodeURIComponent(message)}`
  );
}

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
  const isFormSubmission = request.headers
    .get('content-type')
    ?.includes('multipart/form-data');

  if (!(await isAdminAuthenticated())) {
    if (isFormSubmission) {
      return redirectToPath(request, '/login?error=unauthorized');
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    let body;

    if (isFormSubmission) {
      const formData = await request.formData();
      const imageFile = formData.get('image');
      const imageSrc = String(formData.get('imageSrc') || '').trim();
      const imageAlt = String(formData.get('imageAlt') || '').trim();

      body = {
        slug: String(formData.get('slug') || '').trim(),
        title: String(formData.get('title') || '').trim(),
        category: String(formData.get('category') || '').trim(),
        date: String(formData.get('date') || '').trim(),
        author: String(formData.get('author') || '').trim(),
        excerpt: String(formData.get('excerpt') || '').trim(),
      };

      if (imageFile && typeof imageFile !== 'string' && imageFile.size > 0) {
        body.image = {
          ...(await uploadImageToImgBB(imageFile)),
          alt: imageAlt || body.title,
        };
      } else if (imageSrc) {
        body.image = {
          src: imageSrc,
          alt: imageAlt || body.title,
        };
      } else {
        return redirectWithError(request, 'Choose an image or enter an image URL.');
      }

      for (const field of ['slug', 'title', 'category', 'date', 'author', 'excerpt']) {
        if (!body[field]) {
          return redirectWithError(request, `${field} is required.`);
        }
      }
    } else {
      body = await request.json();
    }

    const newNews = await News.create(body);

    if (isFormSubmission) {
      return redirectWithSuccess(request, 'News article added successfully.');
    }

    return NextResponse.json(newNews, { status: 201 });
  } catch (error) {
    console.error('Unable to create news:', error);

    if (isFormSubmission) {
      return redirectWithError(
        request,
        error.message || 'Failed to create news article.'
      );
    }

    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}