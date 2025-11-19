// app/api/auth/logout/route.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  // // Gửi request sang backend để xoá cookie
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout`, {
  //   method: 'POST',
  //   credentials: 'include',
  //   headers: {
  //     Cookie: (await cookies()).getAll().map(c => `${c.name}=${c.value}`).join('; '),
  //   },
  // });

  // return new Response('Logged out', { status: res.status });
  const res = NextResponse.json(
    { message: "Logged out" },
    { status: 200 }
  );

  res.cookies.set({
    name: "my_session",
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,        // ❗ hủy cookie ngay lập tức
  });

  return res;
}
