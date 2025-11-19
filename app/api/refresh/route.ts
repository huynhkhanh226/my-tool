import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  console.log("refreshToken", refreshToken)
  const requestInit: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: refreshToken ? `Bearer ${refreshToken}` : "",
      "Content-Type": "application/json",
    },
    credentials: 'include',
  };
  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/refresh`, requestInit);
  const responseData = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(
      { message: responseData.message || 'Refresh token thất bại' },
      { status: backendRes.status }
    );
  }
  const response =  NextResponse.json(responseData, { status: backendRes.status });

  // Nếu backend trả accessToken mới trong body thì gán vào cookie
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
