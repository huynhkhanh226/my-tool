"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useUser } from "../store/user/useUser";
import { fetchUserProfile } from "../store/user";
import { User } from "../store/user/user.types";
import { useRouter } from "next/navigation";
import { isTokenNearExpiry } from "../utils/jwt";

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  // Auto-refresh mỗi 4 phút
  useEffect(() => {
    // Kiểm tra token khi load page và đăng nhập nếu có cookie hoặc thông tin auth
    const verify = async () => {
      const res = await fetch("/api/verify", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok && data && data.accessToken) {
        setAccessToken(data.accessToken);
        // store
        dispatch(
          fetchUserProfile({
          })
        );
      } else {
        router.push("/signin")
      }
    };
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // C2: Dựa vào expire
  useEffect(() => {
    //fetchUser(); // gọi lần đầu
    const interval = setInterval(async () => {
      if (!accessToken || isTokenNearExpiry(accessToken)) {
        try {
          const res = await fetch("/api/refresh", {
            method: "POST",
          });
          if (!res.ok) {
            router.push("/signin");
          }
          const data = await res.json();
          setAccessToken(data.accessToken);
        } catch (err) {
          console.error("Refresh failed", err);
          router.push("/signin");
        }
      }
    }, 5 * 60 * 1000); // mỗi 5 phút // 5 * 60 * 1000

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  // C1: Không dùng expired ad
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     try {
  //       const res = await fetch('/api/refresh', {
  //         method: 'POST',
  //       });
  //       if (!res.ok) {
  //         router.push('/signin');
  //       }
  //     } catch (err) {
  //       console.error('Refresh failed', err);
  //       router.push('/signin');
  //     }
  //   }, 4 * 60 * 1000); // refresh mỗi 4 phút 4 * 60 * 1000

  //   return () => clearInterval(interval);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const profile = user ? user : null;
  return (
    <AuthContext.Provider value={{ user: profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
