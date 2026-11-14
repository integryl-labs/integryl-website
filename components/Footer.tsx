/* eslint-disable @next/next/no-img-element -- brand SVG, served as-is */
import Link from "next/link";
import { practices } from "@/content/practices";
import { FRACTIONAL_OFFER } from "@/content/roles";
import { CONTACT_EMAIL, INTELLIGENCE_LIVE, INTELLIGENCE_URL, OFFICE, SUBSCRIBE_URL, TAGLINE } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <img src="/img/header-logo-dark-background.svg" alt="Integryl" width={131} height={46} />
            <p>{TAGLINE}</p>
          </div>
          <nav className="footer-col" aria-label="Advisory">
            <p className="label">Advisory</p>
            {practices.map((practice) => (
              <Link key={practice.id} href={`/advisory#${practice.id}`}>
                {practice.name}
              </Link>
            ))}
          </nav>
          <nav className="footer-col" aria-label="Intelligence">
            <p className="label">Intelligence</p>
            <Link href="/intelligence#daily-brief">Daily Brief</Link>
            <Link href="/intelligence#deep-dives">Deep Dives</Link>
            {INTELLIGENCE_LIVE ? <a href={INTELLIGENCE_URL}>Latest edition</a> : null}
            <a href={SUBSCRIBE_URL}>Subscribe</a>
          </nav>
          <nav className="footer-col" aria-label="Firm">
            <p className="label">Firm</p>
            <Link href="/firm">About Integryl</Link>
            <Link href="/fractional-leadership">{FRACTIONAL_OFFER}</Link>
            <Link href="/engage">Engage</Link>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Integryl. {OFFICE}.</span>
          <span>
            <Link href="/privacy">Privacy</Link> &nbsp;·&nbsp; <Link href="/terms">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
