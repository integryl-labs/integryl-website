export const SITE_URL = "https://integryl.com";
export const SITE_NAME = "Integryl";
export const TAGLINE = "Risk advisory for financial institutions.";
export const CONTACT_EMAIL = "hello@integryl.com";
export const OFFICE = "Hilton Head, South Carolina";
export const LINKEDIN_URL = "https://www.linkedin.com/in/ianlassonde/";

/**
 * Integryl Intelligence is published on Beehiiv. Every "read" and "subscribe"
 * link on the site derives from this one base URL, so moving the publication
 * to intelligence.integryl.com is a single environment-variable change.
 */
export const INTELLIGENCE_URL = (
  process.env.NEXT_PUBLIC_INTELLIGENCE_URL ?? "https://integryl-intelligence.beehiiv.com"
).replace(/\/+$/, "");

export const SUBSCRIBE_URL = `${INTELLIGENCE_URL}/subscribe`;

/**
 * Integryl Intelligence has not published yet. Until NEXT_PUBLIC_INTELLIGENCE_LIVE
 * is set to "true", the site presents it as coming soon: visitors can subscribe,
 * but nothing links to editions that do not exist. Launch is that one variable.
 */
export const INTELLIGENCE_LIVE = process.env.NEXT_PUBLIC_INTELLIGENCE_LIVE === "true";

export const nav = [
  { href: "/advisory", label: "Advisory" },
  { href: "/fractional-leadership", label: "Fractional Leadership" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/firm", label: "Firm" },
];

/** Routes whose hero is navy, so the header renders in its dark variant. */
export const darkHeaderRoutes = ["/", "/fractional-leadership"];
