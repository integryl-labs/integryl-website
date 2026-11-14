import type { Metadata } from "next";
import Link from "next/link";
import { Closing } from "@/components/Closing";
import { CONTACT_EMAIL } from "@/content/site";

export const metadata: Metadata = {
  title: "The Firm",
  description:
    "Integryl is a specialist advisory firm for financial institutions, focused on artificial intelligence, cybersecurity and risk. Human led, AI powered.",
};

const commitments = [
  {
    title: "Senior delivery",
    body: "The practitioners who scope an engagement are the practitioners who deliver it.",
  },
  {
    title: "Work that withstands scrutiny",
    body: "Our conclusions are written for senior leadership and boards, and prepared to stand up to audit and examination.",
  },
  {
    title: "Clarity",
    body: "We state our findings plainly, so that the executives accountable for risk can act on them.",
  },
];

export default function FirmPage() {
  return (
    <>
      <section className="hero hero--ivory hero--page">
        <div className="wrap hero-inner">
          <p className="label">The Firm</p>
          <h1>Human led. AI powered.</h1>
          <p className="lede">
            Integryl is a specialist advisory firm for financial institutions, focused on artificial intelligence,
            cybersecurity and risk.
          </p>
        </div>
      </section>

      <section className="section section--white">
        <div className="wrap split">
          <div className="stack">
            <p className="label">Our purpose</p>
            <h2>Institutions rarely need more technology. They need sound judgment about it.</h2>
          </div>
          <div className="stack">
            <p className="lede">
              Financial institutions are expected to defend against more capable adversaries, meet rising
              supervisory expectations and adopt artificial intelligence, often at the same time and with the same
              team.
            </p>
            <p>
              Integryl was founded to provide senior, practical support for that work. We test, we advise and,
              through fractional leadership, we stand behind the people who carry the responsibility.
            </p>
            <p>
              Our focus is financial institutions. We also advise organizations in other regulated sectors where
              the same disciplines apply.
            </p>
            <p>
              We also publish our thinking. Integryl Intelligence is issued every business morning, so our
              perspective is on the record before any engagement begins.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--navy clip">
        {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG, served as-is */}
        <img className="ghost-mark" src="/img/integryl-symbol-reverse-two-tone.svg" alt="" />
        <div className="wrap rel">
          <div className="section-head">
            <p className="label">How we work</p>
            <h2>Experienced judgment, extended by technology.</h2>
          </div>
          <div className="cols cols--2 cols--mid">
            <div className="point">
              <h3>Human led</h3>
              <p>
                Senior practitioners set direction, exercise judgment and remain accountable for every conclusion
                we deliver.
              </p>
            </div>
            <div className="point">
              <h3>AI powered</h3>
              <p>
                We apply artificial intelligence to research, analysis and monitoring, so our people concentrate
                on the decisions that require experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="label">Principles</p>
            <h2>Three commitments to every client.</h2>
          </div>
          <div className="cols cols--3">
            {commitments.map((commitment, index) => (
              <div className="point" key={commitment.title}>
                <span className="num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{commitment.title}</h3>
                <p>{commitment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white section--rule">
        <div className="wrap">
          <div className="section-head">
            <p className="label">Leadership</p>
            <h2>Our leadership.</h2>
          </div>
          <div className="split split--portrait">
            <div className="portrait" aria-hidden="true" />
            <div className="stack">
              <h3 className="leader-name">Ian Lassonde</h3>
              <p className="label">Chief Executive Officer</p>
              <p className="lede">
                As Chief Executive Officer of Integryl, Ian leads a team of senior consultants and advises senior
                leadership and boards on artificial intelligence, cybersecurity and technology risk.
              </p>
              <p>
                He has spent his career in financial services, with leadership roles at Capital One, Discover,
                Truist, Wells Fargo, MUFG Union Bank and TIAA. He has built and run technology and security
                programs, and he has been the executive responsible for overseeing and challenging them.
              </p>
              <p>
                Ian has led global teams and complex regulatory engagements. He has advised financial institutions
                on adopting artificial intelligence, and he still builds and secures artificial intelligence
                systems himself.
              </p>
              <p>
                He holds a B.S. in Computer Science from the U.S. Naval Academy, served as an officer in the U.S.
                Marine Corps and is a named inventor on four published U.S. patent applications.
              </p>
            </div>
          </div>
          <div className="point section-gap">
            <h3>Join the firm</h3>
            <p className="measure">
              We are building a team of senior practitioners with experience inside financial institutions. To
              begin a conversation, write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
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
