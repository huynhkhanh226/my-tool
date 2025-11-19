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
  useEffect(() => {
    dispatch(fetchUserProfile({}));
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Defined hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
