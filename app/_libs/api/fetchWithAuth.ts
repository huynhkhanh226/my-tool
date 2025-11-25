// utils/fetchWithAuth.ts
export interface FetchWithAuthOptions extends RequestInit {
  retry?: number;
  headers?: Record<string, string>;
}

export async function fetchWithAuth<T = unknown>(
  url: string,
  options: FetchWithAuthOptions = {},
): Promise<T | null | Response> {
  // null khi 401, Response khi không JSON
  const { retry = 3, headers: customHeaders, ...rest } = options;

  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (customHeaders) {
    Object.entries(customHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }

  const fetchOptions: RequestInit = {
    ...rest,
    headers,
    credentials: "same-origin",
  };

  let attempt = 0;

  while (attempt < retry) {
    attempt++;

    try {
      const res = await fetch(url, fetchOptions);

      // 401 → session hết hạn
      if (res.status === 401) {
        console.warn("Session expired. Redirecting to login...");
        window.location.href = "/login";
        return null;
      }

      // Retry cho server errors 5xx
      if (res.status >= 500 && res.status < 600) {
        console.warn(`Server error (${res.status}), retrying ${attempt}/${retry}...`);
        continue;
      }

      // Nếu content-type là JSON → trả về JSON
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return (await res.json()) as T; // ⚡ TypeScript biết kiểu trả về
      }

      return res; // raw Response nếu không JSON
    } catch (err) {
      console.warn(`Network error, retrying ${attempt}/${retry}...`, err);
      if (attempt >= retry) throw err;
    }
  }

  return null; // fallback nếu retry hết
}

// const data = await fetchWithAuth("/api/me");
// const result = await fetchWithAuth("/api/submit", {
//   method: "POST",
//   headers: { "X-Custom": "123" },
//   body: JSON.stringify({ foo: "bar" }),
//   retry: 5, // tuỳ chỉnh số lần retry
// });
