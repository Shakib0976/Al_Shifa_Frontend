import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

function redirectToLogin(request, error) {
  const location = `/login?error=${error}`;
  const response = NextResponse.redirect(new URL(location, request.url), 303);
  response.headers.set("Location", location);
  return response;
}

export async function POST(request) {
  const isJson = request.headers
    .get("content-type")
    ?.includes("application/json");

  try {
    await dbConnect();
    const body = isJson ? await request.json() : await request.formData();
    const emailValue = isJson ? body.email : body.get("email");
    const passwordValue = isJson ? body.password : body.get("password");

    if (
      typeof emailValue !== "string" ||
      typeof passwordValue !== "string" ||
      !emailValue.trim() ||
      !passwordValue
    ) {
      if (!isJson) {
        return redirectToLogin(request, "missing-fields");
      }

      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const email = emailValue.trim().toLowerCase();
    const password = passwordValue;

    // ১. ইউজার খোঁজা
    const user = await User.findOne({ email });
    if (!user) {
      if (!isJson) {
        return redirectToLogin(request, "invalid-credentials");
      }

      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // ২. পাসওয়ার্ড মেলানো
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      if (!isJson) {
        return redirectToLogin(request, "invalid-credentials");
      }

      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // ৩. টোকেন তৈরি
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ৪. কুকিতে টোকেন সেট করা
    const response = isJson
      ? NextResponse.json({
          message: "Login successful",
          user: { name: user.name, email: user.email, role: user.role },
        })
      : NextResponse.redirect(new URL("/admin/dashboard", request.url), 303);

    if (!isJson) {
      response.headers.set("Location", "/admin/dashboard");
    }

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 দিন
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Unable to process login:", error);

    if (!isJson) {
      return redirectToLogin(request, "login-unavailable");
    }

    return NextResponse.json(
      { error: "Unable to log in right now. Please try again." },
      { status: 500 }
    );
  }
}