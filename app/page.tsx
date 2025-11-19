import AboutSectionOne from "@/app/_components/user/About/AboutSectionOne";
import AboutSectionTwo from "@/app/_components/user/About/AboutSectionTwo";
import Blog from "@/app/_components/user/Blog";
import Brands from "@/app/_components/user/Brands";
import ScrollUp from "@/app/_components/user/Common/ScrollUp";
import Contact from "@/app/_components/user/Contact";
import Features from "@/app/_components/user/Features";
import Hero from "@/app/_components/user/Hero";
import Pricing from "@/app/_components/user/Pricing";
import Testimonials from "@/app/_components/user/Testimonials";
import Video from "@/app/_components/user/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Next.js Template for Startup and SaaS",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
    </>
  );
}
