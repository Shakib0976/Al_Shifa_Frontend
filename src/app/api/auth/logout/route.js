import { NextResponse } from 'next/server';

export async function POST(request) {
  const response = NextResponse.redirect(new URL("/login", request.url), 303);
  response.headers.set("Location", "/login");
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    expires: new Date(0),
    path: "/",
  });
  return response;
}