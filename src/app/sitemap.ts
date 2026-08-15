import type { MetadataRoute } from "next";
import { GUIDES, SITE_URL, TOOLS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/about", "/privacy"];
  const toolPaths = TOOLS.map((tool) => tool.href);
  const guidePaths = GUIDES.filter((g) => g.status === "available").map(
    (g) => `/guides/${g.slug}`
  );

  return [...staticPaths, ...toolPaths, ...guidePaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
