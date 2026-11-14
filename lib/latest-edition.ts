import { cacheLife } from "next/cache";
import { parseFeed, type Edition } from "@/lib/feed";

/**
 * The newest post from the Integryl Intelligence feed, refreshed every
 * 30 minutes. Returns null when the feed is unset, unreachable or empty,
 * so callers render their fallback instead of an error.
 */
export async function getLatestEdition(): Promise<Edition | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 1800, expire: 86400 });

  const url = process.env.BEEHIIV_RSS_URL;
  if (!url) return null;

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return null;
    return parseFeed(await response.text());
  } catch {
    return null;
  }
}
