"use client";
// import { Metadata } from "next";
import { LogoutButton } from "../../../components/LogoutButton";
import { useAuth } from "../../../context/AuthContext";
import FadeIn from "../../../components/layout/FadeIn";
import PageContainer from "../../../components/layout/PageContainer";

// export const metadata: Metadata = {
//   title: "Free Next.js Template for Startup and SaaS",
//   description: "This is Home for Startup Nextjs Template",
//   // other metadata
// };

export default function Login() {
  const { user } = useAuth();
  return (
    <PageContainer>
      <FadeIn delay={100}>
        <h1>This is Content ${user?.name}</h1>
        <LogoutButton />
      </FadeIn>
    </PageContainer>
  );
}
