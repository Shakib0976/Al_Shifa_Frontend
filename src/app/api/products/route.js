import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { uploadImageToImgBB } from "@/lib/imgbb";
import { categories as productCategories } from "@/data/products";

function redirectToPath(request, path) {
  const response = NextResponse.redirect(new URL(path, request.url), 303);
  response.headers.set("Location", path);
  return response;
}

function redirectWithError(request, error) {
  return redirectToPath(
    request,
    `/admin/products/new?error=${encodeURIComponent(error)}`
  );
}

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
  const isFormSubmission = request.headers
    .get("content-type")
    ?.includes("multipart/form-data");

  if (!(await isAdminAuthenticated())) {
    if (isFormSubmission) {
      return redirectToPath(request, "/login?error=unauthorized");
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    let body;
    let imageFile;
    let imageAlt = "";

    if (isFormSubmission) {
      const formData = await request.formData();
      imageFile = formData.get("image");
      imageAlt = String(formData.get("imageAlt") || "").trim();
      const selectedCategory = productCategories.find(
        (category) => category.slug === formData.get("categorySlug")
      );
      if (!selectedCategory) {
        return redirectWithError(request, "Choose a valid product category.");
      }

      body = {
        name: String(formData.get("name") || "").trim(),
        slug: String(formData.get("slug") || "").trim(),
        category: selectedCategory?.name || "",
        categorySlug: selectedCategory?.slug || "",
        description: String(formData.get("description") || "").trim(),
        price: formData.get("price"),
        unit: String(formData.get("unit") || "").trim(),
        highlights: String(formData.get("highlights") || ""),
      };
    } else {
      body = await request.json();
    }

    const requiredFields = [
      "name",
      "slug",
      "category",
      "categorySlug",
      "description",
      "price",
      "unit",
    ];

    for (const field of requiredFields) {
      const value = body[field];
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && !value.trim())
      ) {
        const message = `${field} is required`;
        return isFormSubmission
          ? redirectWithError(request, message)
          : NextResponse.json({ error: message }, { status: 400 });
      }
    }

    body.price = Number(body.price);
    if (!Number.isFinite(body.price)) {
      const message = "Price must be a valid number";
      return isFormSubmission
        ? redirectWithError(request, message)
        : NextResponse.json({ error: message }, { status: 400 });
    }

    if (typeof body.highlights === "string") {
      body.highlights = body.highlights
        .split(",")
        .map((highlight) => highlight.trim())
        .filter(Boolean);
    }

    if (isFormSubmission) {
      if (!imageFile || typeof imageFile === "string" || imageFile.size === 0) {
        return redirectWithError(request, "Choose a product image to upload.");
      }

      const uploadedImage = await uploadImageToImgBB(imageFile);
      body.image = {
        ...uploadedImage,
        alt: imageAlt || body.name,
      };
    }

    const newProduct = await Product.create(body);

    if (isFormSubmission) {
      return redirectToPath(request, "/admin/products");
    }

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Unable to create product:", error);

    if (isFormSubmission) {
      return redirectWithError(
        request,
        error.message || "Failed to create product."
      );
    }

    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
