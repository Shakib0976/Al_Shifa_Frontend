import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function isAdminAuthenticated() {
  const token = (await cookies()).get("token")?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, secret);
    return typeof decoded === "object" && decoded.role === "admin";
  } catch {
    return false;
  }
}
