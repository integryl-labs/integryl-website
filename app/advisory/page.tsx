import type { Metadata } from "next";
import Link from "next/link";
import { Closing } from "@/components/Closing";
import { practices } from "@/content/practices";

export const metadata: Metadata = {
  title: "Advisory",
  description:
    "Six practices for financial institutions: artificial intelligence, cybersecurity, data risk, technology risk, governance, risk and compliance, and operational resilience.",
};

export default function AdvisoryPage() {
  return (
    <>
      <section className="hero hero--ivory hero--page">
        <div className="wrap hero-inner">
          <p className="label">Advisory</p>
          <h1>Six practices. One standard of work.</h1>
          <p className="lede">
            We help financial institutions adopt artificial intelligence, strengthen security and manage risk with
            confidence. Every practice is available as an ongoing retainer or a defined project.
          </p>
          <p className="fine">
            Our focus is financial institutions. We also advise organizations in other regulated sectors where the
            same disciplines apply.
          </p>
          <nav className="index-nav" aria-label="Practices">
            {practices.map((practice) => (
              <a key={practice.id} href={`#${practice.id}`}>
                {practice.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="section--white">
        <div className="wrap">
          {practices.map((practice, index) => (
            <article className="practice" id={practice.id} key={practice.id}>
              <div className="practice-head">
                <span className="num">{String(index + 1).padStart(2, "0")}</span>
                <h2>{practice.name}</h2>
                <hr className="rule" />
              </div>
              <div className="practice-body">
                <p className="lede">{practice.line}</p>
                <ul className="ticks two">
                  {practice.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
                {practice.note ? <p className="fine">{practice.note}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Closing
        label="Engage"
        title="Unsure where to begin?"
        body="Describe the challenge. We will advise on where we can help."
      >
        <Link className="btn" href="/engage">
          Engage
        </Link>
      </Closing>
    </>
  );
}
