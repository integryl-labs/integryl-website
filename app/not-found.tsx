import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap stack">
        <p className="label">Page not found</p>
        <h1 className="h1-page">This page does not exist.</h1>
        <p className="lede">The address may have changed, or the link may be out of date.</p>
        <div className="btn-row">
          <Link className="btn" href="/">
            Return home
          </Link>
          <Link className="btn btn--ghost" href="/engage">
            Engage
          </Link>
        </div>
      </div>
    </section>
  );
}
