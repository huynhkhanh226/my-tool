// app/api/auth/logout/route.ts
import { cookies } from 'next/headers';

export async function POST() {
  // Gửi request sang backend để xoá cookie
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Cookie: (await cookies()).getAll().map(c => `${c.name}=${c.value}`).join('; '),
    },
  });

  return new Response('Logged out', { status: res.status });
}
