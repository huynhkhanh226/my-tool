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

import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

export default async function proxy(request: NextRequest) {
  // 1. Ưu tiên locale trong cookie
  const cookieLocale = request.cookies.get("locale")?.value;

  // 2. Nếu không có cookie → lấy từ header → cuối cùng default = 'en'
  const defaultLocale = cookieLocale || request.headers.get("x-your-custom-locale") || "en";

  // 3. Khởi tạo middleware next-intl
  const handleI18nRouting = createMiddleware({
    ...routing,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultLocale: defaultLocale as any,
  });

  // 4. Gọi middleware
  const response = handleI18nRouting(request);

  // 5. Ghi lại locale vào response header (optional)
  response.headers.set("x-your-custom-locale", defaultLocale);

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
