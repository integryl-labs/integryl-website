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

/** Returns the newest item of an RSS 2.0 feed, or null when there is none. */
export function parseFeed(xml: string): Edition | null {
  if (!xml.trim()) return null;

  let parsed: unknown;
  try {
    parsed = parser.parse(xml);
  } catch {
    return null;
  }

  const channel = (parsed as { rss?: { channel?: { item?: unknown } } })?.rss?.channel;
  const raw = channel?.item;
  const first = (Array.isArray(raw) ? raw[0] : raw) as Record<string, unknown> | undefined;
  if (!first || typeof first !== "object") return null;

  const title = plainText(asString(first.title));
  const url = asString(first.link);
  if (!title || !/^https?:\/\//.test(url)) return null;

  const parsedDate = new Date(asString(first.pubDate));
  const date = Number.isNaN(parsedDate.getTime()) ? "" : parsedDate.toISOString();

  return { title, url, date, summary: truncate(plainText(asString(first.description))) };
}
