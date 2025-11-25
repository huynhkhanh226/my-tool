// import { NextRequest, NextResponse } from "next/server";

// export async function proxy(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const PUBLIC_FILE = /\.(.*)$/;
//   // ✅ Bỏ qua middleware cho các trang không cần auth
//   if (["/signin", "/signup"].includes(pathname) || PUBLIC_FILE.test(pathname) || pathname.startsWith('/api')) {
//     return NextResponse.next();
//   }
//   const mySession = req.cookies.get("my_session")?.value;
//   // ✅ Nếu có accessToken → dùng luôn
//   if (mySession) {
//     const pathnameIsMissingLocale = !/^\/(en|vi)(\/|$)/.test(pathname);
//     if (pathnameIsMissingLocale) {
//       const defaultLocale = req.headers.get('accept-language')?.split(',')[0].startsWith('vi') ? 'vi' : 'en';
//       return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, req.url));
//     } else {
//       return NextResponse.redirect(new URL(`/ja${pathname}`, req.url));
//     }
//   }

//   // ❌ Không có token hợp lệ → redirect về login
//   const loginUrl = new URL("/signin", req.url);
//   loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
//   return NextResponse.redirect(loginUrl);
// }

// // middleware.ts
// export const config = {
//   matcher: ["/", "/user"], // Chỉ áp dụng cho những route này
// };
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const LOCALES = ["en", "vi"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1️⃣ Skip api, static files, public files
  if (pathname.startsWith("/api") || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // 2️⃣ i18n: check if locale is in path
  const pathSegments = pathname.split("/");
  let locale = LOCALES.includes(pathSegments[1]) ? pathSegments[1] : "en";

  if (!locale) {
    console.log("locale", pathSegments);
    // Detect from Accept-Language
    const acceptLang = req.headers.get("accept-language") || "";
    locale = acceptLang.startsWith("vi") ? "vi" : "en";
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }

  // 3️⃣ Session check: ví dụ cookie 'session_token'
  const sessionToken = req.cookies.get("my_session")?.value;
  const isAuthPage = pathname.startsWith(`/${locale}/login`);

  // Nếu chưa login và không phải trang login → redirect
  if (!sessionToken && !isAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  // Nếu đã login mà đang ở login page → redirect về home
  if (sessionToken && isAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}/`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/user"], // Chỉ áp dụng cho những route này
};
