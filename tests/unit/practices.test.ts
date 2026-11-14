import { describe, expect, it } from "vitest";
import { practices } from "@/content/practices";
import { roles } from "@/content/roles";

describe("practices", () => {
  it("are in the fixed order", () => {
    expect(practices.map((p) => p.id)).toEqual(["ai", "cyber", "data", "technology", "grc", "resilience"]);
    expect(practices.map((p) => p.name)).toEqual([
      "Artificial Intelligence",
      "Cybersecurity",
      "Data Risk",
      "Technology Risk",
      "Governance, Risk & Compliance",
      "Operational Resilience",
    ]);
  });

  it("each have one line and four capabilities", () => {
    for (const p of practices) {
      expect(p.line.length).toBeGreaterThan(10);
      expect(p.capabilities).toHaveLength(4);
    }
  });
});

describe("roles", () => {
  it("are the two fractional roles", () => {
    expect(roles.map((r) => r.title)).toEqual([
      "Fractional Chief Information Security Officer",
      "Fractional Chief Technology & AI Risk Officer",
    ]);
  });
});
