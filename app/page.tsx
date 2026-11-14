/* eslint-disable @next/next/no-img-element -- brand SVGs, served as-is */
import Link from "next/link";
import { Closing } from "@/components/Closing";
import { LatestEdition } from "@/components/LatestEdition";
import { PracticeGrid } from "@/components/PracticeGrid";
import { FRACTIONAL_OFFER, roles } from "@/content/roles";

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
            <p className="lede">Each practice is available as an ongoing retainer or a defined project.</p>
          </div>
          <PracticeGrid />
        </div>
      </section>

      <section className="section section--navy clip">
        <img className="ghost-mark" src="/img/integryl-symbol-reverse-two-tone.svg" alt="" />
        <div className="wrap split split--wide-left rel">
          <div className="stack">
            <p className="label">{FRACTIONAL_OFFER}</p>
            <h2>Senior leadership behind your designated officer.</h2>
            <p className="lede">
              Your institution keeps its own officer. Integryl stands behind them with a senior leader and
              intelligence tailored to your institution.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/fractional-leadership">
                View the roles
              </Link>
            </div>
          </div>
          <ul className="rows">
            {roles.map((role) => (
              <li key={role.title}>
                <h3>{role.title}</h3>
                <p>{role.stance}.</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="stack">
            <p className="label">The Firm</p>
            <h2>Human led. AI powered.</h2>
          </div>
          <div className="stack">
            <p className="lede">
              Senior practitioners direct every engagement. Artificial intelligence extends their reach, and we
              operate the systems we advise on.
            </p>
            <p>
              <Link className="link" href="/firm">
                About Integryl
              </Link>
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
      </Closing>
    </>
  );
}
