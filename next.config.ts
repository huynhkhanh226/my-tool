import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  //  cacheComponents: true,
  sassOptions: {
    implementation: "sass-embedded",
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
