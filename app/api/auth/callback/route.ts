// app/api/auth/callback/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Lấy user info từ IdP tại đây...
  const user = { id: "123", name: "John Doe" };

  // Set cookie session chứa userId hoặc sessionId
  const res = NextResponse.redirect("/dashboard");

  res.cookies.set({
    name: "my_session",
    value: JSON.stringify(user),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
