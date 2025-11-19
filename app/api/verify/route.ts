// app/api/user/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.json(null, { status: 200 });
    }
    const requestInit: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json",
      },
      credentials: 'include',
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/verify`, requestInit);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
