import type { MetadataRoute } from "next";

import { SITE_MAP } from "@/script/constant/meta";

const USER_AGENT = "*";
const ALLOW = "/";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: USER_AGENT,
      allow: ALLOW,
    },
    sitemap: SITE_MAP,
  };
};

export default robots;
