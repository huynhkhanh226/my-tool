import { fetchWithAuth } from "../../api/fetchWithAuth";
export const getUserProfile = async () => {
   const res = await fetchWithAuth(`/api/user`, {
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
