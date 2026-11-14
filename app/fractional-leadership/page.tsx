import type { Metadata } from "next";
import Link from "next/link";
import { Closing } from "@/components/Closing";
import { FRACTIONAL_OFFER, roles } from "@/content/roles";

export const metadata: Metadata = {
  title: FRACTIONAL_OFFER,
  description:
    "Integryl places a senior leader on your executive team as Chief Information Security Officer or Chief Technology & AI Risk Officer, on a fractional basis.",
};

const comparison = [
  {
    row: "Cost",
    fullTime: "Executive compensation, benefits and search fees",
    fractional: "A monthly retainer aligned to the mandate",
  },
  { row: "Time to start", fullTime: "An executive search measured in months", fractional: "In role within weeks" },
  {
    row: "Depth",
    fullTime: "The experience of one individual",
    fractional: "A senior leader supported by six practices",
  },
  {
    row: "Continuity",
    fullTime: "A new search when the executive departs",
    fractional: "Program knowledge retained by the firm",
  },
  {
    row: "Flexibility",
    fullTime: "Permanent headcount",
    fractional: "Expand, reduce or transition to a full-time appointment",
  },
];

const steps = [
  {
    title: "Assess",
    body: "A focused review of the program, its controls, its vendors and its open findings, concluding in a plan for the board.",
  },
  {
    title: "Embed",
    body: "Your leader joins the executive team and its committees and becomes the named owner of the program.",
  },
  {
    title: "Lead",
    body: "They set priorities, direct vendors and testing, maintain policy and report to the board and regulators.",
  },
  {
    title: "Scale",
    body: "The mandate expands for a major initiative, reduces as the program matures or transitions to a full-time appointment.",
  },
];

const support = [
  {
    title: "Financial services depth",
    body: "Our team brings deep financial services experience, so your leader is effective from the outset.",
  },
  {
    title: "Proven executives",
    body: "Your leader has previously held the accountability they assume on your behalf.",
  },
  {
    title: "Six practices in support",
    body: "Penetration testing, resilience exercises and artificial intelligence reviews are delivered by the same firm.",
  },
  {
    title: "Intelligence included",
    body: "Each mandate includes Integryl Intelligence and a briefing tailored to your institution.",
  },
];

export default function FractionalLeadershipPage() {
  return (
    <>
      <section className="hero hero--navy on-dark">
        <div className="wrap hero-inner">
          <p className="label">{FRACTIONAL_OFFER}</p>
          <h1 className="hero-title--wide">Executive leadership, on a fractional basis.</h1>
          <p className="lede">
            Integryl places a senior leader on your executive team as Chief Information Security Officer or Chief
            Technology &amp; AI Risk Officer. The role is fractional. The accountability is not.
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
        <div className="wrap split">
          <div className="stack">
            <p className="label">Why fractional</p>
            <h2>Risk needs an owner at the leadership table.</h2>
          </div>
          <div className="stack">
            <p className="lede">
              Cybersecurity, technology and artificial intelligence now carry consequences that reach the board.
              Each requires a senior owner with the authority to set direction and the experience to defend it.
            </p>
            <p>
              For many institutions, a full-time executive is difficult to justify, slow to recruit and hard to
              retain. In the absence of one, responsibility is divided among providers and no one owns the outcome.
            </p>
            <p>
              A fractional leader closes that gap: an experienced executive who knows your institution, serves on
              your committees and answers to your board and your regulators.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--rule anchor" id="roles">
        <div className="wrap">
          <div className="section-head">
            <p className="label">The roles</p>
            <h2>Two roles. One standard of accountability.</h2>
          </div>
          <div className="cols cols--2">
            {roles.map((role) => (
              <div className="seat" key={role.letter}>
                <span className="num">{role.letter}</span>
                <h3>{role.title}</h3>
                <p className="owns">{role.owns}</p>
                <p>{role.summary}</p>
                <ul className="ticks">
                  {role.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="fine note-gap">The two roles may be combined in a single mandate.</p>
        </div>
      </section>

      <section className="section section--white section--rule">
        <div className="wrap">
          <div className="section-head">
            <p className="label">The alternative</p>
            <h2>Fractional and full-time leadership, compared.</h2>
          </div>
          <div className="table-scroll">
            <table className="compare">
              <thead>
                <tr>
                  <td />
                  <th scope="col">Full-time executive</th>
                  <th scope="col">Integryl fractional leader</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((line) => (
                  <tr key={line.row}>
                    <th scope="row">{line.row}</th>
                    <td>{line.fullTime}</td>
                    <td>{line.fractional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="wrap">
          <div className="section-head">
            <p className="label">How it works</p>
            <h2>Part of your leadership team from the first week.</h2>
          </div>
          <div className="steps">
            {steps.map((step, index) => (
              <div className="step" key={step.title}>
                <span className="num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
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
              “Risk is managed well when one senior person owns it. We take that role, and we are accountable for
              it.”
            </blockquote>
            <figcaption className="label">Ian Lassonde · Founder &amp; Principal, Integryl</figcaption>
          </figure>
        </div>
      </section>

      <Closing
        label="Engage"
        title="Appoint an owner for the program."
        body="Tell us where the program stands today. We will recommend the role and the mandate that fit."
      >
        <Link className="btn" href="/engage">
          Discuss a fractional role
        </Link>
      </Closing>
    </>
  );
}
