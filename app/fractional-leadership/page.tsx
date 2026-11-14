import type { Metadata } from "next";
import Link from "next/link";
import { Closing } from "@/components/Closing";
import { FRACTIONAL_OFFER, roles } from "@/content/roles";

export const metadata: Metadata = {
  title: FRACTIONAL_OFFER,
  description:
    "Senior risk and security leadership for financial institutions, on a fractional basis: a senior leader, intelligence tailored to your institution and clear priorities each quarter.",
};

/** The three situations an institution may be in when it comes to us. */
const situations = [
  {
    title: "You have a dedicated officer",
    body: "We stand behind them with senior counsel and intelligence, so they are not the only expert in the room.",
  },
  {
    title: "You have named one of your executives",
    body: "Many institutions give the role to an executive who has another job. We give that person the specialist depth the role demands.",
  },
  {
    title: "You have no one yet",
    body: "We help you decide where the role should sit and who should hold it, and we can cover the role for a defined period while you appoint.",
  },
];

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
    body: "A senior Integryl leader works with your officer in regular sessions, sets clear priorities each quarter and reports in terms your senior leadership and board can use.",
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
    title: "Intelligence, applied",
    body: "Each mandate includes a weekly briefing written for your institution, and an alert when a development affects your vendors or your regulators.",
  },
];

export default function FractionalLeadershipPage() {
  return (
    <>
      <section className="hero hero--navy on-dark">
        <div className="wrap hero-inner">
          <p className="label">{FRACTIONAL_OFFER}</p>
          <h1 className="hero-title--wide">Senior risk and security leadership, sized to your institution.</h1>
          <p className="lede">
            A senior Integryl leader, intelligence tailored to your institution and a clear set of priorities each
            quarter, behind whoever carries the role today.
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
            <p className="label">Where you are today</p>
            <h2>Wherever the role sits, it should not be carried alone.</h2>
          </div>
          <div className="cols cols--3">
            {situations.map((situation) => (
              <div className="point" key={situation.title}>
                <h3>{situation.title}</h3>
                <p>{situation.body}</p>
              </div>
            ))}
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
            The two roles may be combined in a single mandate. Where an institution needs a permanent named
            officer, examination preparation or incident response, we scope that separately.
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

      <Closing
        label="Engage"
        title="Put senior judgment behind the role."
        body="Tell us where the program stands today. We will recommend the role and the mandate that fit."
      >
        <Link className="btn" href="/engage">
          Discuss a fractional role
        </Link>
      </Closing>
    </>
  );
}
