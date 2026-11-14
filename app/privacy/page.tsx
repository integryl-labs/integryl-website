import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Integryl handles information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="wrap prose">
        <p className="label">Legal</p>
        <h1 className="h1-page">Privacy</h1>
        <p className="draft-banner">
          Draft for review. This text is a working draft and has not been approved for publication.
        </p>
        <p className="fine">Last updated: November 14, 2026</p>

        <p>
          This notice explains what information Integryl collects through integryl.com, why we collect it and how
          to reach us about it.
        </p>

        <h2>Information you send us</h2>
        <p>
          When you submit the Engage form we receive the name, organization, email address, area of interest and
          message you provide. We use this information to respond to your inquiry and to conduct any engagement
          that follows. Inquiries are delivered to us through a third-party form and email service. This website
          keeps no copy of them.
        </p>

        <h2>Integryl Intelligence</h2>
        <p>
          Subscriptions to Integryl Intelligence are handled on the publication’s own site, which is operated on
          the Beehiiv platform. If you subscribe, your email address and subscription preferences are held there,
          and you can unsubscribe at any time using the link in any edition.
        </p>

        <h2>Analytics</h2>
        <p>
          We measure visits to this website with a privacy-focused analytics service that does not use cookies and
          does not identify individual visitors. We do not use advertising trackers.
        </p>

        <h2>Sharing</h2>
        <p>
          We do not sell personal information. We share it only with service providers that help us operate this
          website and our communications, and when the law requires it.
        </p>

        <h2>Your choices</h2>
        <p>
          You may ask us what information we hold about you, or ask us to correct or delete it, by writing to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </section>
  );
}
