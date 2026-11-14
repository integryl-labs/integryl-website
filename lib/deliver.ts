import { Resend } from "resend";
import type { EngageInput } from "@/lib/engage";

export type Provider = "resend" | "formspree" | "none";
export type Delivery = { ok: boolean; provider: Provider };

type Env = Record<string, string | undefined>;

/** The Formspree form the previous site used. Public: it appeared in that site's HTML. */
const DEFAULT_FORMSPREE_FORM_ID = "xeevpokj";

function formspreeId(env: Env): string {
  // An explicitly empty FORMSPREE_FORM_ID switches Formspree off (used by the test server).
  return (env.FORMSPREE_FORM_ID ?? DEFAULT_FORMSPREE_FORM_ID).trim();
}

/**
 * Resend is the intended route. Until its three settings exist, inquiries go
 * through the Formspree form the previous site used, so the form works from
 * day one and switches over with no code change.
 */
export function chooseProvider(env: Env = process.env): Provider {
  if (env.RESEND_API_KEY && env.ENGAGE_TO_EMAIL && env.ENGAGE_FROM_EMAIL) return "resend";
  if (formspreeId(env)) return "formspree";
  return "none";
}

function subjectFor(inquiry: EngageInput): string {
  return `Inquiry: ${inquiry.interest} — ${inquiry.organization}`.replace(/[\r\n]+/g, " ");
}

async function viaResend(inquiry: EngageInput, env: Env): Promise<boolean> {
  const { name, organization, email, interest, message } = inquiry;
  const { error } = await new Resend(env.RESEND_API_KEY).emails.send({
    from: env.ENGAGE_FROM_EMAIL as string,
    to: env.ENGAGE_TO_EMAIL as string,
    replyTo: email,
    subject: subjectFor(inquiry),
    text: [
      `Name: ${name}`,
      `Organization: ${organization}`,
      `Email: ${email}`,
      `Area of interest: ${interest}`,
      "",
      message,
    ].join("\n"),
  });
  if (error) console.error("Resend rejected the inquiry email:", error.name, error.message);
  return !error;
}

async function viaFormspree(inquiry: EngageInput, env: Env): Promise<boolean> {
  const response = await fetch(`https://formspree.io/f/${formspreeId(env)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...inquiry, _subject: subjectFor(inquiry) }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) console.error("Formspree rejected the inquiry:", response.status);
  return response.ok;
}

/** Sends an inquiry to the firm. Never throws: a failure is reported as ok: false. */
export async function deliverInquiry(inquiry: EngageInput, env: Env = process.env): Promise<Delivery> {
  const provider = chooseProvider(env);
  if (provider === "none") {
    console.error("Engage form has no delivery route: set the Resend variables or FORMSPREE_FORM_ID.");
    return { ok: false, provider };
  }
  try {
    const ok = provider === "resend" ? await viaResend(inquiry, env) : await viaFormspree(inquiry, env);
    return { ok, provider };
  } catch (cause) {
    console.error(`Inquiry delivery through ${provider} failed:`, cause instanceof Error ? cause.message : cause);
    return { ok: false, provider };
  }
}
