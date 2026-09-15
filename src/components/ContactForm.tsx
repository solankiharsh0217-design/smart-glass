"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Something went wrong.");
      setStatus("sent");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-accent/40 bg-peach p-8">
        <p className="text-[1.2rem] font-semibold text-accent-ink">Thanks — message received.</p>
        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
          We usually reply within one working day. If it is urgent, WhatsApp is the
          fastest way to reach us.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-[0.9rem] font-semibold text-accent-ink underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {FIELDS.map((f) => (
        <div key={f.name}>
          <label
            htmlFor={f.name}
            className="mb-2 block text-[0.85rem] font-semibold text-ink"
          >
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            required
            className="w-full rounded-lg border border-line-dark bg-card px-4 py-3 text-[0.98rem] text-ink outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </div>
      ))}

      <div>
        <label htmlFor="message" className="mb-2 block text-[0.85rem] font-semibold text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Dimensions, location and what you are trying to achieve."
          className="w-full resize-y rounded-lg border border-line-dark bg-card px-4 py-3 text-[0.98rem] text-ink outline-none transition-colors placeholder:text-muted focus:border-accent"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-[0.9rem] font-medium text-accent-ink">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex rounded-lg bg-accent px-8 py-3.5 text-[0.98rem] font-semibold text-accent-ink transition-all hover:-translate-y-0.5 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
