import { Resend } from "resend";
import { validateEngage } from "@/lib/engage";

/**
 * Receives an inquiry from the Engage form and emails it to the firm through
 * Resend, with the inquirer as reply-to. Nothing is stored.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, errors: { form: "The inquiry could not be read." } }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Answer as if it worked.
  if (body && typeof body === "object" && "company_website" in body) {
    const trap = (body as Record<string, unknown>).company_website;
    if (typeof trap === "string" && trap.trim() !== "") return Response.json({ ok: true });
  }

  const result = validateEngage(body);
  if (!result.ok) return Response.json(result, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENGAGE_TO_EMAIL;
  const from = process.env.ENGAGE_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Engage form is not configured: RESEND_API_KEY, ENGAGE_TO_EMAIL and ENGAGE_FROM_EMAIL are required.");
    return Response.json({ ok: false }, { status: 502 });
  }

  const { name, organization, email, interest, message } = result.data;
  const subject = `Inquiry: ${interest} — ${organization}`.replace(/[\r\n]+/g, " ");

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text: [
        `Name: ${name}`,
        `Organization: ${organization}`,
        `Email: ${email}`,
        `Area of interest: ${interest}`,
        "",
        message,
      ].join("\n"),
    });
    if (error) {
      console.error("Resend rejected the inquiry email:", error.name, error.message);
      return Response.json({ ok: false }, { status: 502 });
    }
  } catch (cause) {
    console.error("Resend request failed:", cause instanceof Error ? cause.message : cause);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
