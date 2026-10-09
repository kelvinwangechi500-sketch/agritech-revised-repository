import { MetadataRoute } from "next";
import { MOCK_ITEMS } from "@/lib/mock-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://agritechsolutions.co.ke";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: BASE, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${BASE}/livestock`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE}/vet-services`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE}/feeds`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE}/products`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE}/search`, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${BASE}/request`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/about`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/contact`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/how-it-works`, changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  const itemRoutes = MOCK_ITEMS.map((item) => ({
    url: `${BASE}/item/${item.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    lastModified: new Date(item.created_at),
  }));

  return [...staticRoutes, ...itemRoutes];
}
