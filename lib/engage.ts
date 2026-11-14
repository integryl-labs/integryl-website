import { practices } from "@/content/practices";
import { FRACTIONAL_OFFER } from "@/content/roles";

export type EngageInput = {
  name: string;
  organization: string;
  email: string;
  interest: string;
  message: string;
};

export type EngageResult =
  | { ok: true; data: EngageInput }
  | { ok: false; errors: Record<string, string> };

/** The options offered in the form, in display order. */
export const interestOptions = [FRACTIONAL_OFFER, ...practices.map((p) => p.name), "Other"];

const LIMITS = { name: 200, organization: 200, email: 254, message: 5000 } as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

export function validateEngage(body: unknown): EngageResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, errors: { form: "The inquiry could not be read." } };
  }
  const input = body as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const name = field(input, "name");
  const organization = field(input, "organization");
  const email = field(input, "email");
  const message = field(input, "message");
  const interest = field(input, "interest") || "Not specified";

  if (!name) errors.name = "Enter your name.";
  else if (name.length > LIMITS.name) errors.name = "Name is too long.";

  if (!organization) errors.organization = "Enter your organization.";
  else if (organization.length > LIMITS.organization) errors.organization = "Organization is too long.";

  if (!email) errors.email = "Enter your work email.";
  else if (email.length > LIMITS.email || !EMAIL.test(email)) errors.email = "Enter a valid email address.";

  if (!message) errors.message = "Tell us briefly how we can help.";
  else if (message.length > LIMITS.message) errors.message = "Message is too long.";

  if (interest !== "Not specified" && !interestOptions.includes(interest)) {
    errors.interest = "Choose an area from the list.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { name, organization, email, interest, message } };
}
