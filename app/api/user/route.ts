// app/api/user/me/route.ts
import { fetchWithAuth } from '@/app/_libs/api/fetchWithAuth';
import { NextResponse } from 'next/server';
export async function POST() {
  try {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/info`, {
      method: "POST"
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
