import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // ✅ Bỏ qua middleware cho các trang không cần auth
  if (["/signin", "/signup"].includes(pathname)) {
    return NextResponse.next();
  }
  const mySession = req.cookies.get("my_session")?.value;
  // ✅ Nếu có accessToken → dùng luôn
  if (mySession) {
    return NextResponse.next();
  }

  // ❌ Không có token hợp lệ → redirect về login
  const loginUrl = new URL("/signin", req.url);
  loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

// middleware.ts
export const config = {
  matcher: [
    "/",
    "/user",
  ], // Chỉ áp dụng cho những route này
};
