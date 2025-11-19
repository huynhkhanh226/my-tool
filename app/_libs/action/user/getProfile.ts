// lib/actions/getProfile.ts
'use server';

import { fetchWithAuth } from '../../api/fetchWithAuth';

export async function getProfile() {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/info`, {
    method: "POST",
    body: JSON.stringify({
        email: "admin@gmail.com"
    })
  });
  if (!res.ok) {
    return null; // hoặc ném lỗi nếu cần
  }

  return await res.json();
}