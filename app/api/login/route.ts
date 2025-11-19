import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include', // quan trọng để nhận cookie nếu cùng domain
  });

  const responseData = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(
      { message: responseData.message || 'Đăng nhập thất bại' },
      { status: backendRes.status }
    );
  }

  const response = NextResponse.json({ success: true });

  // ⚠️ Nếu backend đã gửi cookie (Set-Cookie), ta pass lại cho client
  const setCookie = backendRes.headers.get('set-cookie');
  console.log("backendRes.headers", backendRes.headers)
  if (setCookie) {
    response.headers.set('set-cookie', setCookie); // truyền lại cookie cho trình duyệt
  }

  // ✅ Thêm accessToken vào cookie phía server
  if (responseData.accessToken) {
    response.cookies.set('accessToken', responseData.accessToken, {
      httpOnly: true,
      secure: process.env.ENV=="local" ? false : true,
      sameSite: process.env.ENV=="local" ?  "lax" : "none" ,
      path: '/',
      maxAge: 60 * 5, // 5 phút
    });
  }

  if (responseData.refreshToken) {
    response.cookies.set('refreshToken', responseData.refreshToken, {
      httpOnly: true,
      secure: process.env.ENV === 'local' ? false : true,
      sameSite: process.env.ENV === 'local' ? 'lax' : 'none',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 ngày
    });
  }

  return response;
}
