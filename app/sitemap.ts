import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

const routes = ["", "/advisory", "/fractional-leadership", "/intelligence", "/firm", "/engage", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${SITE_URL}${route}`, changeFrequency: "monthly" }));
}
