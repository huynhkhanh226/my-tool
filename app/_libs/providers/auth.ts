// lib/api/auth.ts

export const loginApi = async (email: string, password: string) => {
  const res = await fetch("/api/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return await res.json(); // { accessToken }
};

export const logoutApi = async () => {
  const res = await fetch("/api/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");
};

export const refreshApi = async () => {
  const res = await fetch("/api/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Refresh failed");
  return await res.json(); // { accessToken }
};
