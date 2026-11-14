import type { Metadata } from "next";
import Link from "next/link";
import { Closing } from "@/components/Closing";
import { FRACTIONAL_OFFER, roles } from "@/content/roles";

export const metadata: Metadata = {
  title: FRACTIONAL_OFFER,
  description:
    "Your institution keeps its designated officer. Integryl stands behind them with a senior leader, intelligence tailored to your institution and clear priorities each quarter.",
};

/** How a mandate works, in three parts. */
const process = [
  {
    title: "Baseline",
    body: "We begin with a baseline of the program and a profile of your institution: its regulators, its vendors and its systems.",
  },
  {
    title: "Intelligence",
    body: "From then on, our intelligence is tailored to that profile. Your officer hears what matters to your institution, and what to do about it.",
  },
  {
    title: "Counsel",
    body: "A senior Integryl leader works with your officer in regular sessions, sets clear priorities each quarter and reports in terms your board can use.",
  },
];

const support = [
  {
    title: "Financial services depth",
    body: "Our team brings deep financial services experience, so your leader is useful from the first conversation.",
  },
  {
    title: "A senior practitioner",
    body: "You work with one senior leader who knows your institution, not a rotating team.",
  },
  {
    title: "Six practices in support",
    body: "Penetration testing, resilience exercises and artificial intelligence reviews are delivered by the same firm.",
  },
  {
    title: "Intelligence built in",
    body: "Integryl Intelligence is tailored to your institution, your regulators and your vendors.",
  },
];

export default function FractionalLeadershipPage() {
  return (
    <>
      <section className="hero hero--navy on-dark">
        <div className="wrap hero-inner">
          <p className="label">{FRACTIONAL_OFFER}</p>
          <h1 className="hero-title--wide">Senior leadership behind your designated officer.</h1>
          <p className="lede">
            Your institution keeps its own officer. Integryl stands behind them with a senior leader, intelligence
            tailored to your institution and a clear set of priorities each quarter.
          </p>
          <div className="btn-row">
            <Link className="btn" href="/engage">
              Discuss a fractional role
            </Link>
            <a className="btn btn--ghost" href="#roles">
              View the roles
            </a>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="wrap">
          <div className="section-head section-head--wide">
            <p className="label">Why fractional</p>
            <h2>Your officer carries the responsibility. They should not carry it alone.</h2>
          </div>
          <div className="cols cols--3">
            <p className="lede">
              Most institutions have a designated officer for security, technology or risk. Few can give that
              person a senior specialist to turn to.
            </p>
            <p>
              The role has widened. Cybersecurity, technology and artificial intelligence now reach the board, and
              the questions arrive faster than one person can research them. A full-time executive to share the
              load is difficult to justify and slow to recruit.
            </p>
            <p>
              A fractional leader from Integryl is the expert behind your officer: informed about your institution,
              clear about what matters this quarter and present in your meetings as the mandate requires.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--rule anchor" id="roles">
        <div className="wrap">
          <div className="section-head">
            <p className="label">The roles</p>
            <h2>Two roles. One way of working.</h2>
          </div>
          <div className="cols cols--2">
            {roles.map((role) => (
              <div className="seat" key={role.title}>
                <h3>{role.title}</h3>
                <p className="owns">{role.stance}</p>
                <p>{role.summary}</p>
                <ul className="ticks">
                  {role.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="fine note-gap">
            The two roles may be combined in a single mandate. Where an institution needs a named officer,
            examination preparation or incident response, we scope that separately.
          </p>
        </div>
      </section>

      <section className="section section--navy">
        <div className="wrap">
          <div className="section-head">
            <p className="label">How it works</p>
            <h2>Built on a baseline. Run on intelligence.</h2>
          </div>
          <div className="cols cols--3">
            {process.map((part, index) => (
              <div className="point" key={part.title}>
                <span className="num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{part.title}</h3>
                <p>{part.body}</p>
              </div>
            ))}
          </div>
          <p className="fine note-gap">
            Mandates scale with the institution, from counsel and priorities to a seat in your committees.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="label">Why Integryl</p>
            <h2>The firm behind the role.</h2>
          </div>
          <div className="cols cols--4">
            {support.map((point) => (
              <div className="point" key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory2">
        <div className="wrap">
          <figure className="quote">
            <hr className="rule rule--brass" />
            <blockquote>
              “A designated officer should not have to carry the role alone. We stand behind them with the judgment
              and the intelligence the role demands.”
            </blockquote>
            <figcaption className="label">Ian Lassonde · Founder &amp; Principal, Integryl</figcaption>
          </figure>
        </div>
      </section>

      <Closing
        label="Engage"
        title="Strengthen the officer you already have."
        body="Tell us where the program stands today. We will recommend the role and the mandate that fit."
      >
        <Link className="btn" href="/engage">
          Discuss a fractional role
        </Link>
      </Closing>
    </>
  );
}
