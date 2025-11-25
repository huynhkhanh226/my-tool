import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //  cacheComponents: true,
  sassOptions: {
    implementation: "sass-embedded",
  },
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  },
};

export default nextConfig;
