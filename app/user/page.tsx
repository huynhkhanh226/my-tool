import { Metadata } from "next";
import { LogoutButton } from "../_components/LogoutButton";

export const metadata: Metadata = {
  title: "Free Next.js Template for Startup and SaaS",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default function User() {
  return (
    <>
      <h1>This is Content</h1>
      <LogoutButton />
    </>
  );
}
