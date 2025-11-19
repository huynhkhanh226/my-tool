import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { isTokenNearExpiry } from '../utils/jwt';

export async function serverFetchWithAuth(
  input: RequestInfo,
  init: RequestInit = {},
  maxRetries = 3
): Promise<Response> {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken || isTokenNearExpiry(accessToken)) {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/refresh`,
      {
        method: "POST",
      }
    );
    if (!refreshRes.ok) {
      redirect("/signin"); 
    }
    const newCookieStore = await cookies(); 
    accessToken = newCookieStore.get("accessToken")?.value;
  }

  let retries = 0;
  while (retries <= maxRetries) {
    const requestInit: RequestInit = {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    const res = await fetch(input, requestInit);
    if (res.status === 401 && retries < maxRetries) {
      // Cookie đã được set trong lần fetch này
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/refresh`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!refreshRes.ok) {
        redirect("/signin"); 
      }
      const newCookieStore = await cookies(); 
      accessToken = newCookieStore.get("accessToken")?.value;
      retries++;
    } else {
      return res;
    }
  }

  throw new Error("Max retries exceeded");
}
