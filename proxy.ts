import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // ✅ Bỏ qua middleware cho các trang không cần auth
  if (["/signin", "/signup"].includes(pathname)) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken")?.value;
  // ✅ Nếu có accessToken → dùng luôn
  if (accessToken) {
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
    "/dashboard/:path*",
    "/client/profile",
    "/client/openrouter/conversion-state",
    "/client/openrouter/image-generator",
    "/client/openrouter/file-input",
    "/client/openrouter/reasoning",
    "/client/openai/chat-completions",
    "/client/openai/image-generator",
    "/client/openai/image-editor",
    "/client/openai/audio-generator",
    "/client/openai/file-input",
    "/client/openai/reasoning",
  ], // Chỉ áp dụng cho những route này
};
