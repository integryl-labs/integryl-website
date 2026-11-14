import { afterEach, describe, expect, it, vi } from "vitest";
import { chooseProvider, deliverInquiry } from "@/lib/deliver";

const inquiry = {
  name: "Ada Lovelace",
  organization: "First Bank",
  email: "ada@firstbank.com",
  interest: "Cybersecurity",
  message: "We need a penetration test.",
};

const resendEnv = {
  RESEND_API_KEY: "re_test",
  ENGAGE_TO_EMAIL: "hello@integryl.com",
  ENGAGE_FROM_EMAIL: "Integryl <engage@notify.integryl.com>",
};

afterEach(() => vi.unstubAllGlobals());

describe("chooseProvider", () => {
  it("uses Resend once all three Resend settings exist", () => {
    expect(chooseProvider(resendEnv)).toBe("resend");
  });

  it("falls back to Formspree while Resend is incomplete", () => {
    expect(chooseProvider({})).toBe("formspree");
    expect(chooseProvider({ RESEND_API_KEY: "re_test" })).toBe("formspree");
  });

  it("delivers nowhere when Formspree is switched off and Resend is not set", () => {
    expect(chooseProvider({ FORMSPREE_FORM_ID: "" })).toBe("none");
  });
});

describe("deliverInquiry through Formspree", () => {
  it("posts the inquiry as JSON to the form and reports success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const outcome = await deliverInquiry(inquiry, { FORMSPREE_FORM_ID: "abc123" });

    expect(outcome).toEqual({ ok: true, provider: "formspree" });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://formspree.io/f/abc123");
    expect(init.method).toBe("POST");
    expect(init.headers.Accept).toBe("application/json");
    const sent = JSON.parse(init.body);
    expect(sent).toMatchObject(inquiry);
    expect(sent._subject).toBe("Inquiry: Cybersecurity — First Bank");
  });

  it("reports failure when Formspree rejects the submission", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 422 })));
    expect((await deliverInquiry(inquiry, { FORMSPREE_FORM_ID: "abc123" })).ok).toBe(false);
  });

  it("reports failure when the request throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    expect((await deliverInquiry(inquiry, { FORMSPREE_FORM_ID: "abc123" })).ok).toBe(false);
  });

  it("reports failure without calling out when nothing is configured", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await deliverInquiry(inquiry, { FORMSPREE_FORM_ID: "" })).toEqual({ ok: false, provider: "none" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
