/* eslint-disable @next/next/no-img-element -- brand SVG, served as-is */
import type { Metadata } from "next";
import { Closing } from "@/components/Closing";
import { Bands, Cover } from "@/components/Cover";
import { INTELLIGENCE_URL, SUBSCRIBE_URL } from "@/content/site";

export const metadata: Metadata = {
  title: "Integryl Intelligence",
  description:
    "Executive intelligence on technology, cyber, artificial intelligence and risk for financial services leaders. Daily Brief and Deep Dives.",
  openGraph: { images: [{ url: "/og-intelligence.png", width: 1200, height: 630, alt: "Integryl Intelligence" }] },
};

const standards = [
  { title: "Sourced", body: "We summarize only from material we have retrieved, and we cite every source." },
  { title: "Labeled", body: "Fact and analysis are kept distinct. Our view appears under “Integryl analysis.”" },
  {
    title: "Reviewed",
    body: "Editions are assembled with artificial intelligence and verified by an editor before release.",
  },
];

export default function IntelligencePage() {
  return (
    <>
      <section className="hero hero--bands">
        <Bands />
        <div className="wrap hero-inner">
          <img className="lockup" src="/img/integryl-intelligence-navy.svg" alt="Integryl Intelligence" />
          <h1 className="hero-title--wide">Executive intelligence for financial services leaders.</h1>
          <p className="lede">
            Integryl Intelligence covers technology, cyber, artificial intelligence and risk. Every item is
            sourced, and our analysis is clearly labeled.
          </p>
          <div className="btn-row" id="subscribe">
            <a className="btn" href={SUBSCRIBE_URL}>
              Subscribe
            </a>
            <a className="btn btn--ghost" href={INTELLIGENCE_URL}>
              Read the latest edition
            </a>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="wrap">
          <div className="section-head">
            <p className="label">Publications</p>
            <h2>Two series. One editorial standard.</h2>
          </div>
          <div className="cols cols--2 cols--narrow">
            <div className="cover-card anchor" id="daily-brief">
              <Cover
                series="Daily Brief"
                eyebrow="Integryl Intelligence"
                title="Daily Brief"
                deck="The developments that matter this morning, and why."
                foot="2026"
              />
              <p className="label">Every business morning</p>
              <h3>Daily Brief</h3>
              <p>
                The leading developments in regulation, cyber and artificial intelligence, each with sources and a
                concise Integryl analysis.
              </p>
            </div>
            <div className="cover-card anchor" id="deep-dives">
              <Cover
                series="Deep Dive"
                eyebrow="AI Governance Series"
                title="The OCC’s “Super Intelligence” Framework"
                deck="What examiners may ask about your AI."
                foot="Nov 2026"
                long
              />
              <p className="label">As developments warrant</p>
              <h3>Deep Dives</h3>
              <p>A single development examined in full, with practical guidance for leadership.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--rule">
        <div className="wrap">
          <div className="section-head">
            <p className="label">Editorial standard</p>
            <h2>Human led. AI powered.</h2>
          </div>
          <div className="cols cols--3">
            {standards.map((standard) => (
              <div className="point" key={standard.title}>
                <h3>{standard.title}</h3>
                <p>{standard.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Closing
        label="Integryl Intelligence"
        title="Read the latest edition."
        body="Current and past editions are published on the Integryl Intelligence site."
      >
        <a className="btn" href={INTELLIGENCE_URL}>
          Visit Integryl Intelligence
        </a>
        <a className="btn btn--ghost" href={SUBSCRIBE_URL}>
          Subscribe
        </a>
      </Closing>
    </>
  );
}
