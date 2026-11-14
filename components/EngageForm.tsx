"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL } from "@/content/site";
import { interestOptions } from "@/lib/engage";

type Status = "idle" | "sending" | "sent" | "failed";

export function EngageForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setErrors({});

    try {
      const response = await fetch("/api/engage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        errors?: Record<string, string>;
      } | null;

      if (response.ok && result?.ok) {
        setStatus("sent");
        return;
      }
      if (response.status === 400 && result?.errors) {
        setErrors(result.errors);
        setStatus("idle");
        return;
      }
      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-card" role="status">
        <h2>Thank you.</h2>
        <p>Your inquiry has been received. A senior member of the firm will respond within one business day.</p>
      </div>
    );
  }

  const describe = (name: string) => (errors[name] ? `${name}-error` : undefined);
  const fieldError = (name: string) =>
    errors[name] ? (
      <p className="field-error" id={`${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate aria-label="Inquiry">
      <div className="field">
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" type="text" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={describe("name")} />
        {fieldError("name")}
      </div>
      <div className="field">
        <label htmlFor="organization">Organization</label>
        <input id="organization" name="organization" type="text" autoComplete="organization" aria-invalid={!!errors.organization} aria-describedby={describe("organization")} />
        {fieldError("organization")}
      </div>
      <div className="field">
        <label htmlFor="email">Work email</label>
        <input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={describe("email")} />
        {fieldError("email")}
      </div>
      <div className="field">
        <label htmlFor="interest">Area of interest</label>
        <select id="interest" name="interest" defaultValue="" aria-invalid={!!errors.interest} aria-describedby={describe("interest")}>
          <option value="">Select an area</option>
          {interestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {fieldError("interest")}
      </div>
      <div className="field">
        <label htmlFor="message">How can we help?</label>
        <textarea id="message" name="message" aria-invalid={!!errors.message} aria-describedby={describe("message")} />
        {fieldError("message")}
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {status === "failed" ? (
        <p className="form-status form-status--error" role="alert">
          We could not send your inquiry. Please email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      ) : null}
      {errors.form ? (
        <p className="form-status form-status--error" role="alert">
          {errors.form}
        </p>
      ) : null}
      <div className="btn-row">
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Submit inquiry"}
        </button>
      </div>
      <p className="fine">All inquiries are treated as confidential.</p>
    </form>
  );
}
