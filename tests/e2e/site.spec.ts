import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const routes = [
  { path: "/", h1: "Risk advisory for financial institutions." },
  { path: "/advisory", h1: "Six practices. One standard of work." },
  { path: "/fractional-leadership", h1: "Senior risk and security leadership, sized to your institution." },
  { path: "/intelligence", h1: "Executive intelligence for financial services leaders." },
  { path: "/firm", h1: "Human led. AI powered." },
  { path: "/engage", h1: "Begin with a conversation." },
  { path: "/privacy", h1: "Privacy" },
  { path: "/terms", h1: "Terms of use" },
];

const practiceOrder = [
  "Artificial Intelligence",
  "Cybersecurity",
  "Data Risk",
  "Technology Risk",
  "Governance, Risk & Compliance",
  "Operational Resilience",
];

const texts = async (page: Page, selector: string) =>
  (await page.locator(selector).allTextContents()).map((text) => text.trim());

for (const route of routes) {
  test.describe(route.path, () => {
    test("loads with its heading", async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText(route.h1);
      await expect(page.locator("h1")).toHaveCount(1);
    });

    test("has no serious accessibility violations", async ({ page }) => {
      await page.goto(route.path);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });

    test("does not scroll sideways on a phone", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(route.path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("never stacks two navy blocks back to back", async ({ page }) => {
      await page.goto(route.path);
      const tones = await page.locator("main > section").evaluateAll((sections) =>
        sections.map((s) => (s.matches(".section--navy, .closing, .hero--navy") ? "navy" : "light")),
      );
      const stacked = tones.filter((tone, i) => tone === "navy" && tones[i - 1] === "navy");
      expect(stacked, tones.join(" > ")).toEqual([]);
    });

    test("carries no retired or excluded content", async ({ page }) => {
      await page.goto(route.path);
      const body = await page.locator("body").innerText();
      expect(body).not.toContain("Monthly Outlook");
      expect(body).not.toContain("Chief Risk Officer");
      // The retired independence claim. "Independent oversight" in the bio is a different thing.
      expect(body).not.toMatch(/vendor.neutral|independent (firm|advi[cs])|sell products|referral fee/i);
      if (route.path !== "/privacy" && route.path !== "/terms") {
        expect(body).not.toMatch(/\d\s?%/);
        expect(body).not.toMatch(/\$\s?\d/);
      }
    });
  });
}

test("practice order is identical everywhere it is listed", async ({ page }) => {
  await page.goto("/");
  expect(await texts(page, ".grid-lines h3")).toEqual(practiceOrder);
  expect(await texts(page, 'footer nav[aria-label="Advisory"] a')).toEqual(practiceOrder);

  await page.goto("/advisory");
  expect(await texts(page, "article.practice h2")).toEqual(practiceOrder);
  expect(await texts(page, 'nav[aria-label="Practices"] a')).toEqual(practiceOrder);

  await page.goto("/engage");
  const options = await texts(page, "#interest option");
  expect(options.filter((option) => practiceOrder.includes(option))).toEqual(practiceOrder);
});

test("fractional page offers exactly the two roles", async ({ page }) => {
  await page.goto("/fractional-leadership");
  expect(await texts(page, ".seat h3")).toEqual([
    "Fractional Chief Information Security Officer",
    "Fractional Chief Technology & AI Risk Officer",
  ]);
});

test("home page stays at six sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main > section")).toHaveCount(6);
  await expect(page.locator(".hero .btn")).toHaveCount(1);
});

test("firm page presents leadership without placeholders", async ({ page }) => {
  await page.goto("/firm");
  const body = await page.locator("main").innerText();
  expect(body).toContain("Ian Lassonde");
  expect(body).toContain("CHIEF EXECUTIVE OFFICER");
  expect(body).toContain("U.S. Naval Academy");
  expect(body).not.toMatch(/\[[^\]]+\]/);
  expect(body).not.toContain("Founder");
  await expect(page.getByRole("link", { name: "Ian on LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/ianlassonde/",
  );
});

test("role cards carry titles only, with no letter labels", async ({ page }) => {
  await page.goto("/fractional-leadership");
  await expect(page.locator(".seat .num")).toHaveCount(0);
  await page.goto("/");
  await expect(page.locator(".rows .num")).toHaveCount(0);
});

test("fractional page does not promise a named officer or ownership", async ({ page }) => {
  await page.goto("/fractional-leadership");
  const body = await page.locator("main").innerText();
  expect(body).not.toMatch(/owns the/i);
  expect(body).not.toContain("accountability is not");
  expect(body).toContain("scope that separately");
});

test("fractional page speaks to institutions with and without an officer", async ({ page }) => {
  await page.goto("/fractional-leadership");
  const cases = await page.locator("main > section").nth(1).locator("h3").allTextContents();
  expect(cases).toEqual(["You have a dedicated officer", "You have named one of your executives", "You have no one yet"]);
  const body = await page.locator("main").innerText();
  expect(body).not.toContain("officer you already have");
  expect(body).not.toContain("keeps its own officer");
  expect(body).toContain("cover the role for a defined period");
  expect(body).toContain("permanent named officer");
});

test.describe("mobile menu", () => {
  for (const path of ["/intelligence", "/"]) {
    test(`opens as a solid panel over the page on ${path}`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(path);
      const nav = page.locator("#site-nav");
      await expect(nav).toBeHidden();
      await page.getByRole("button", { name: "Menu" }).click();
      await expect(nav).toBeVisible();
      const background = await nav.evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(background).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
      await expect(nav.getByRole("link", { name: "Engage" })).toBeVisible();
      await nav.getByRole("link", { name: "Advisory" }).click();
      await expect(page).toHaveURL(/\/advisory$/);
      await expect(nav).toBeHidden();
    });
  }
});

test("header and footer links resolve", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page
    .locator("header a[href^='/'], footer a[href^='/']")
    .evaluateAll((links) => [...new Set(links.map((link) => (link as HTMLAnchorElement).pathname))]);
  expect(hrefs.length).toBeGreaterThan(6);
  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
});

test("subscribe and read links go to the Intelligence publication", async ({ page }) => {
  await page.goto("/intelligence");
  const subscribe = page.getByRole("link", { name: "Subscribe" }).first();
  await expect(subscribe).toHaveAttribute("href", /beehiiv\.com\/subscribe$|integryl\.com\/subscribe$/);
});

test("unknown addresses return the branded 404", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("This page does not exist.");
});

test("security headers are set", async ({ request }) => {
  const headers = (await request.get("/")).headers();
  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["x-content-type-options"]).toBe("nosniff");
});

test.describe("Engage form", () => {
  const fill = async (page: Page) => {
    await page.getByLabel("Full name").fill("Ada Lovelace");
    await page.getByLabel("Organization").fill("First Bank");
    await page.getByLabel("Work email").fill("ada@firstbank.com");
    await page.getByLabel("Area of interest").selectOption("Cybersecurity");
    await page.getByLabel("How can we help?").fill("We need a penetration test.");
  };

  test("shows inline errors when submitted empty", async ({ page }) => {
    await page.goto("/engage");
    await page.getByRole("button", { name: "Submit inquiry" }).click();
    await expect(page.locator(".field-error")).toHaveCount(4);
    await expect(page.getByLabel("Full name")).toHaveAttribute("aria-invalid", "true");
  });

  test("confirms when the inquiry is sent", async ({ page }) => {
    await page.route("**/api/engage", (route) => route.fulfill({ status: 200, json: { ok: true } }));
    await page.goto("/engage");
    await fill(page);
    await page.getByRole("button", { name: "Submit inquiry" }).click();
    await expect(page.getByRole("status")).toContainText("Your inquiry has been received");
  });

  test("keeps the input and offers email when sending fails", async ({ page }) => {
    await page.route("**/api/engage", (route) => route.fulfill({ status: 502, json: { ok: false } }));
    await page.goto("/engage");
    await fill(page);
    await page.getByRole("button", { name: "Submit inquiry" }).click();
    await expect(page.locator(".form-status--error")).toContainText("hello@integryl.com");
    await expect(page.getByLabel("Full name")).toHaveValue("Ada Lovelace");
    await expect(page.getByLabel("How can we help?")).toHaveValue("We need a penetration test.");
  });

  test("the server rejects a bad inquiry and silently accepts a bot", async ({ request }) => {
    const bad = await request.post("/api/engage", { data: { name: "A" } });
    expect(bad.status()).toBe(400);
    const bot = await request.post("/api/engage", {
      data: { name: "Bot", organization: "X", email: "b@x.io", message: "hi", company_website: "http://spam" },
    });
    expect(bot.status()).toBe(200);
  });

  test("the server reports failure when delivery is not configured", async ({ request }) => {
    const response = await request.post("/api/engage", {
      data: { name: "Ada", organization: "First Bank", email: "ada@firstbank.com", interest: "", message: "Hello" },
    });
    expect(response.status()).toBe(502);
  });
});
