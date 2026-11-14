import { describe, expect, it } from "vitest";
import { parseFeed } from "@/lib/feed";

const item = (t: string, d: string) =>
  `<item><title><![CDATA[${t}]]></title><link>https://example.com/p/${t.length}</link><pubDate>${d}</pubDate><description><![CDATA[<p>Summary of ${t}</p>]]></description></item>`;
const wrap = (items: string) =>
  `<?xml version="1.0"?><rss version="2.0"><channel><title>X</title>${items}</channel></rss>`;

describe("parseFeed", () => {
  it("returns the first item", () => {
    const e = parseFeed(
      wrap(item("First", "Thu, 05 Nov 2026 12:30:00 +0000") + item("Second", "Tue, 03 Nov 2026 12:30:00 +0000")),
    );
    expect(e).toEqual({
      title: "First",
      url: "https://example.com/p/5",
      date: "2026-11-05T12:30:00.000Z",
      summary: "Summary of First",
    });
  });

  it("handles a single item", () => {
    expect(parseFeed(wrap(item("Only", "Thu, 05 Nov 2026 12:30:00 +0000")))?.title).toBe("Only");
  });

  it("truncates a long summary on a word boundary", () => {
    const long = "word ".repeat(100).trim();
    const xml = wrap(
      `<item><title>T</title><link>https://example.com/t</link><pubDate>Thu, 05 Nov 2026 12:30:00 +0000</pubDate><description>${long}</description></item>`,
    );
    const summary = parseFeed(xml)!.summary;
    expect(summary.length).toBeLessThanOrEqual(221);
    expect(summary.endsWith("…")).toBe(true);
    expect(summary).not.toMatch(/wor…$/);
  });

  it("returns null for an empty feed", () => {
    expect(parseFeed(wrap(""))).toBeNull();
  });

  it("returns null for malformed input", () => {
    expect(parseFeed("not xml at all")).toBeNull();
    expect(parseFeed("")).toBeNull();
  });

  it("returns null when the item has no usable link", () => {
    expect(parseFeed(wrap("<item><title>No link</title></item>"))).toBeNull();
  });
});
