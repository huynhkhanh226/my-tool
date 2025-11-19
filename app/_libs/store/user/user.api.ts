'use server';

import { serverFetchWithAuth } from "../../api/serverFetchWithAuth";
export const getUserProfile = async () => {
   const res = await serverFetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/info`, {
      method: "POST",
      credentials: "include", // Gửi cookie
      body: JSON.stringify({
      })
    } );
    if (!res.ok) {
      return null; // hoặc ném lỗi nếu cần
    }
    return await res.json();
};
