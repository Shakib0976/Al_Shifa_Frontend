import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import AuthButtonClient from "./auth-button-client";

export default async function AuthButton() {
  const token = (await cookies()).get("token")?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  return <AuthButtonClient isAuthenticated={isAuthenticated} />;
}
