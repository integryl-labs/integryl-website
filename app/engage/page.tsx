import type { Metadata } from "next";
import { EngageForm } from "@/components/EngageForm";
import { CONTACT_EMAIL, OFFICE } from "@/content/site";

export const metadata: Metadata = {
  title: "Engage",
  description: "Begin a conversation with Integryl. A senior member of the firm responds within one business day.",
};

export default function EngagePage() {
  return (
    <section className="section">
      <div className="wrap split">
        <div className="stack">
          <p className="label">Engage</p>
          <h1 className="h1-page">Begin with a conversation.</h1>
          <p className="lede">
            Share a brief outline of what you are working through. A senior member of the firm will respond within
            one business day.
          </p>
          <dl className="contact section-gap">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt>Office</dt>
              <dd>{OFFICE}</dd>
            </div>
          </dl>
        </div>
        <EngageForm />
      </div>
    </section>
  );
}
