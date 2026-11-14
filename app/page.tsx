/* eslint-disable @next/next/no-img-element -- brand SVGs, served as-is */
import Link from "next/link";
import { Closing } from "@/components/Closing";
import { Cover } from "@/components/Cover";
import { LatestEdition } from "@/components/LatestEdition";
import { PracticeGrid } from "@/components/PracticeGrid";
import { FRACTIONAL_OFFER, roles } from "@/content/roles";
import { INTELLIGENCE_URL } from "@/content/site";

const reasons = [
  {
    title: "Financial services depth",
    body: "Our team brings deep financial services experience and a working understanding of how institutions are governed, supervised and targeted.",
  },
  {
    title: "Senior by default",
    body: "Engagements are led and delivered by senior practitioners, from the first conversation to the board presentation.",
  },
  {
    title: "Human led, AI powered",
    body: "Experienced professionals direct every engagement. Artificial intelligence extends their reach, and we operate the systems we advise on.",
  },
  {
    title: "A published perspective",
    body: "We publish our analysis every business day, so clients can assess our judgment before an engagement begins.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero hero--navy on-dark">
        <div className="wrap hero-inner">
          <p className="label">Artificial Intelligence · Cybersecurity · Risk</p>
          <h1>Risk advisory for financial institutions.</h1>
          <p className="lede">
            Integryl advises boards and executive teams on artificial intelligence, cybersecurity and technology
            risk. Our work is led by senior practitioners with deep financial services experience.
          </p>
          <div className="btn-row">
            <Link className="btn" href="/engage">
              Engage
            </Link>
            <Link className="btn btn--ghost" href="/intelligence">
              Read Integryl Intelligence
            </Link>
          </div>
        </div>
      </section>

      <LatestEdition />

      <section className="section">
        <div className="wrap">
          <div className="section-head section-head--split">
            <div>
              <p className="label">Advisory</p>
              <h2>Six practices. One view of risk.</h2>
            </div>
            <p className="lede">
              Each practice is available as an ongoing retainer or a defined project. Together they give
              leadership a single, coherent view of risk across the institution.
            </p>
          </div>
          <PracticeGrid />
        </div>
      </section>

      <section className="section section--navy clip">
        <img className="ghost-mark" src="/img/integryl-symbol-reverse-two-tone.svg" alt="" />
        <div className="wrap split split--wide-left rel">
          <div className="stack">
            <p className="label">{FRACTIONAL_OFFER}</p>
            <h2>Executive leadership, on a fractional basis.</h2>
            <p className="lede">
              An Integryl leader joins your executive team with full accountability for the program and its
              reporting to the board.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/fractional-leadership">
                View the roles
              </Link>
            </div>
          </div>
          <ul className="rows">
            {roles.map((role) => (
              <li key={role.letter}>
                <span className="num">{role.letter}</span>
                <h3>{role.title}</h3>
                <p>{role.owns}.</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="label">Why Integryl</p>
            <h2>A specialist firm for a demanding sector.</h2>
          </div>
          <div className="cols cols--4">
            {reasons.map((reason) => (
              <div className="point" key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white section--rule">
        <div className="wrap">
          <div className="section-head section-head--split">
            <div>
              <img className="lockup--sm" src="/img/integryl-intelligence-navy.svg" alt="Integryl Intelligence" />
              <h2>Research for leaders who carry the risk.</h2>
            </div>
            <div className="stack">
              <p className="lede">
                Executive intelligence on technology, cyber, artificial intelligence and risk for financial
                services leaders.
              </p>
              <p>
                <Link className="link" href="/intelligence">
                  All publications
                </Link>
              </p>
            </div>
          </div>
          <div className="cols cols--2 cols--narrow">
            <Link className="cover-card" href="/intelligence#daily-brief">
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
            </Link>
            <Link className="cover-card" href="/intelligence#deep-dives">
              <Cover
                series="Deep Dive"
                eyebrow="AI Governance Series"
                title="The OCC’s “Super Intelligence” Framework"
                deck="What examiners may ask about your AI."
                foot="Nov 2026"
                long
              />
              <p className="label">Deep Dives</p>
              <h3>In-depth analysis</h3>
              <p>A single development examined in full, with practical guidance for leadership.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="stack">
            <p className="label">The Firm</p>
            <h2>Human led. AI powered.</h2>
            <p className="lede">
              Integryl was founded on a clear conviction: institutions are best served by experienced judgment,
              applied directly to the risks that matter most and supported by the best available technology.
            </p>
            <p>
              <Link className="link" href="/firm">
                About Integryl
              </Link>
            </p>
          </div>
          <div className="point">
            <p className="label">Principal</p>
            <h3>Ian Lassonde</h3>
            <p>
              Founder of Integryl. Ian leads the firm’s advisory work with financial institutions across artificial
              intelligence, cybersecurity and risk.
            </p>
          </div>
        </div>
      </section>

      <Closing
        label="Engage"
        title="Begin with a conversation."
        body="Tell us what you are working through. We respond within one business day."
      >
        <Link className="btn" href="/engage">
          Engage
        </Link>
        <a className="btn btn--ghost" href={INTELLIGENCE_URL}>
          Read the latest edition
        </a>
      </Closing>
    </>
  );
}
