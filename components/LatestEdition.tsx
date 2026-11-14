import Link from "next/link";
import { SUBSCRIBE_URL } from "@/content/site";
import { getLatestEdition } from "@/lib/latest-edition";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/New_York",
});

/**
 * The card under the home hero. Shows the newest Daily Brief when the feed
 * has one, and a standing introduction when it does not.
 */
export async function LatestEdition() {
  const edition = await getLatestEdition();

  return (
    <section className="brief" aria-label="Integryl Intelligence">
      <div className="wrap">
        <div className="brief-card">
          <div className="brief-main">
            {edition ? (
              <>
                <div className="brief-meta">
                  <p className="label">
                    <span className="dot" aria-hidden="true" />
                    Integryl Intelligence · Daily Brief
                  </p>
                  {edition.date ? <p className="fine">{dateFormat.format(new Date(edition.date))}</p> : null}
                </div>
                <h2>{edition.title}</h2>
                {edition.summary ? <p>{edition.summary}</p> : null}
                <p>
                  <a className="link" href={edition.url}>
                    Read the edition
                  </a>
                </p>
              </>
            ) : (
              <>
                <div className="brief-meta">
                  <p className="label">
                    <span className="dot" aria-hidden="true" />
                    Integryl Intelligence
                  </p>
                </div>
                <h2>Executive intelligence for financial services leaders.</h2>
                <p>
                  The Daily Brief covers the developments that matter each business morning. Deep Dives examine a
                  single development in full.
                </p>
                <p>
                  <Link className="link" href="/intelligence">
                    About Integryl Intelligence
                  </Link>
                </p>
              </>
            )}
          </div>
          <div className="brief-side">
            <h3>Receive the Daily Brief.</h3>
            <p className="fine">
              Technology, cyber, artificial intelligence and risk for financial services leaders. Fully sourced,
              with our analysis clearly labeled.
            </p>
            <div className="btn-row">
              <a className="btn" href={SUBSCRIBE_URL}>
                Subscribe
              </a>
            </div>
            <p className="fine">Complimentary. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
