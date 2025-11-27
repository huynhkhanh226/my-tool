import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
export const getUserProfile = async <T>() => {
  const res = await fetchWithAuth(`/api/user`, {
    method: "POST",
    credentials: "include", // Gửi cookie
    body: JSON.stringify({}),
  });
  return res as T;
};
