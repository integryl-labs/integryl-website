import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms governing the use of integryl.com.",
};

export default function TermsPage() {
  return (
    <section className="section">
      <div className="wrap prose">
        <p className="label">Legal</p>
        <h1 className="h1-page">Terms of use</h1>
        <p className="fine">Last updated: November 14, 2026</p>

        <p>These terms govern your use of integryl.com. By using the site you accept them.</p>

        <h2>Information, not advice</h2>
        <p>
          The content of this website and of Integryl Intelligence is provided for general information. It is not
          legal, regulatory, financial or other professional advice, and it does not create a client relationship.
          An engagement with Integryl begins only under a signed agreement.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The content, design and marks on this website belong to Integryl or are used with permission. You may
          share links to it and quote brief passages with attribution. Other reproduction requires our written
          consent.
        </p>

        <h2>Third-party sites</h2>
        <p>
          This website links to sites we do not operate, including sources cited in our publications. We are not
          responsible for their content or practices.
        </p>

        <h2>No warranty</h2>
        <p>
          We work to keep this website accurate and available, but we provide it as is and without warranties of
          any kind. To the extent the law allows, Integryl is not liable for losses arising from its use.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms may be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </section>
  );
}
