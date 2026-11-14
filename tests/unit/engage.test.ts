import { describe, expect, it } from "vitest";
import { validateEngage } from "@/lib/engage";

const good = {
  name: "Ada Lovelace",
  organization: "First Bank",
  email: "ada@firstbank.com",
  interest: "Cybersecurity",
  message: "We need a penetration test.",
};

describe("validateEngage", () => {
  it("accepts a complete inquiry and trims it", () => {
    const r = validateEngage({ ...good, name: "  Ada Lovelace  " });
    expect(r).toEqual({ ok: true, data: good });
  });

  it("requires name, organization, email and message", () => {
    const r = validateEngage({ interest: "Other" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errors).sort()).toEqual(["email", "message", "name", "organization"]);
  });

  it("rejects a malformed email", () => {
    expect(validateEngage({ ...good, email: "ada@" }).ok).toBe(false);
    expect(validateEngage({ ...good, email: "ada firstbank.com" }).ok).toBe(false);
  });

  it("stores an empty interest as Not specified", () => {
    const r = validateEngage({ ...good, interest: "" });
    expect(r.ok && r.data.interest).toBe("Not specified");
  });

  it("rejects an interest that is not on the list", () => {
    expect(validateEngage({ ...good, interest: "Free pizza" }).ok).toBe(false);
  });

  it("rejects oversized input and non-objects", () => {
    expect(validateEngage({ ...good, message: "x".repeat(5001) }).ok).toBe(false);
    expect(validateEngage(null).ok).toBe(false);
    expect(validateEngage("hello").ok).toBe(false);
  });
});
