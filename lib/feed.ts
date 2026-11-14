import { XMLParser } from "fast-xml-parser";

export type Edition = {
  title: string;
  url: string;
  /** ISO 8601, or an empty string when the feed gives no usable date. */
  date: string;
  summary: string;
};

const SUMMARY_LIMIT = 220;

const parser = new XMLParser({ ignoreAttributes: true, parseTagValue: false, trimValues: true });

function plainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string): string {
  if (text.length <= SUMMARY_LIMIT) return text;
  const cut = text.slice(0, SUMMARY_LIMIT);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : typeof value === "number" ? String(value) : "";
}

const DEEP_DIVE = /deep dive/i;

function isDeepDive(entry: Record<string, unknown>): boolean {
  const raw = entry.category;
  const categories = (Array.isArray(raw) ? raw : [raw]).map(asString);
  return DEEP_DIVE.test(asString(entry.title)) || categories.some((category) => DEEP_DIVE.test(category));
}

/**
 * Returns the newest Daily Brief in an RSS 2.0 feed, or null when there is none.
 *
 * The feed carries Deep Dives as well. Those posts are gated to subscribers, so
 * they are skipped: the card on the home page must never link to a subscribe wall.
 * An item with no usable title or link is skipped too.
 */
export function parseFeed(xml: string): Edition | null {
  if (!xml.trim()) return null;

  let parsed: unknown;
  try {
    parsed = parser.parse(xml);
  } catch {
    return null;
  }

  const raw = (parsed as { rss?: { channel?: { item?: unknown } } })?.rss?.channel?.item;
  const entries = (Array.isArray(raw) ? raw : [raw]).filter(
    (entry): entry is Record<string, unknown> => !!entry && typeof entry === "object",
  );

  for (const entry of entries) {
    if (isDeepDive(entry)) continue;

    const title = plainText(asString(entry.title));
    const url = asString(entry.link);
    if (!title || !/^https?:\/\//.test(url)) continue;

    const parsedDate = new Date(asString(entry.pubDate));
    const date = Number.isNaN(parsedDate.getTime()) ? "" : parsedDate.toISOString();

    return { title, url, date, summary: truncate(plainText(asString(entry.description))) };
  }

  return null;
}
