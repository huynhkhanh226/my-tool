import { Metadata } from "next";
import PageContainer from "../components/layout/PageContainer";
import Hero from "../components/layout/Hero";
import FadeIn from "../components/layout/FadeIn";
import { LoginButton } from "../components/LoginButton";

export const metadata: Metadata = {
  title: "Free Next.js Template for Startup and SaaS",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default function Home() {
  return (
    <>
      <PageContainer>
        <FadeIn delay={100}>
          HELLO
          <Hero />
        </FadeIn>

        <FadeIn delay={200}>
          <div className="text-gray-700 text-lg">
            More sections here...
            <LoginButton />
          </div>
        </FadeIn>
      </PageContainer>
    </>
  );
}
