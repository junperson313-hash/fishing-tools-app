import type { MetadataRoute } from "next";
import { SITE_URL, TOOLS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/about", "/privacy"];
  const toolPaths = TOOLS.map((tool) => tool.href);

  return [...staticPaths, ...toolPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
