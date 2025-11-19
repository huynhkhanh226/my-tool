'use client';

import { useRouter } from 'next/navigation';

export function LoginButton() {
  const router = useRouter();
  const handleLogin = async () => {
    await fetch("/api/login", {
      method: "POST",
    });

    // Optional: điều hướng về trang login
    // window.location.href = "/login";
    router.push('/user');
  };

  return <button onClick={handleLogin}>Login</button>;
}
