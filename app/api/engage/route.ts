import { deliverInquiry } from "@/lib/deliver";
import { validateEngage } from "@/lib/engage";

/**
 * Receives an inquiry from the Engage form, validates it and passes it to the
 * delivery route in lib/deliver (Resend, or Formspree until Resend is set up).
 * This site keeps no copy.
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

  const delivery = await deliverInquiry(result.data);
  if (!delivery.ok) return Response.json({ ok: false }, { status: 502 });

  return Response.json({ ok: true });
}
