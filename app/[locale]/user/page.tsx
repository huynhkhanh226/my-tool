"use client";
import { useAuth } from "@/context/AuthContext";
// import { Metadata } from "next";
import { LogoutButton } from "../../../components/LogoutButton";
import FadeIn from "../../../components/layout/FadeIn";
import PageContainer from "../../../components/layout/PageContainer";
import ScrollTable from "@/components/ScrollTable";

// export const metadata: Metadata = {
//   title: "Free Next.js Template for Startup and SaaS",
//   description: "This is Home for Startup Nextjs Template",
//   // other metadata
// };

export default function User() {
  const { user } = useAuth();
  debugger;
  console.log("user123", user);
  return (
    <PageContainer>
      <FadeIn delay={100}>
        <h1>This is Content {user?.name}</h1>
        <LogoutButton />
        <ScrollTable />
      </FadeIn>
    </PageContainer>
  );
}
