"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    // Optional: điều hướng về trang login
    // window.location.href = "/login";
    router.push("/signin");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
