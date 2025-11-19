// utils/fetchWithAuth.ts
type FetchWithAuthOptions = RequestInit & {
  headers?: Record<string, string>; // custom headers
  retry?: number; // số lần retry
};

export async function fetchWithAuth(
  url: string,
  options: FetchWithAuthOptions = {}
): Promise<any> {
  const { retry = 3, headers: customHeaders, ...rest } = options;

  // Dùng Headers class để tránh lỗi TS khi merge
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
    credentials: "same-origin", // cookie tự attach cho same-origin
  };

  let attempt = 0;

  while (attempt < retry) {
    attempt++;

    try {
      const res = await fetch(url, fetchOptions);

      // 401 → session hết hạn
      if (res.status === 401) {
        console.warn("Session expired. Redirecting to login...");
        window.location.href = "/login"; // hoặc mở modal login
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
        return await res.json();
      }

      return res; // raw response
    } catch (err) {
      // Network errors
      console.warn(`Network error, retrying ${attempt}/${retry}...`, err);
      if (attempt >= retry) throw err;
    }
  }
}

// const data = await fetchWithAuth("/api/me");
// const result = await fetchWithAuth("/api/submit", {
//   method: "POST",
//   headers: { "X-Custom": "123" },
//   body: JSON.stringify({ foo: "bar" }),
//   retry: 5, // tuỳ chỉnh số lần retry
// });