"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 lg:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        // Add backend/API integration here, for example a server action, CRM webhook, or marketing automation endpoint.
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstName" />
        <Field label="Last name" name="lastName" />
        <Field label="Work email" name="email" type="email" />
        <Field label="Company" name="company" />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-200">
          Inquiry type
          <select name="type" className="rounded-2xl border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-cyan">
            <option>Demo request</option>
            <option>Support inquiry</option>
            <option>Partnership inquiry</option>
          </select>
        </label>
        <Field label="Phone" name="phone" />
      </div>
      <label className="mt-4 grid gap-2 text-sm font-medium text-slate-200">
        What would you like to build?
        <textarea name="message" rows={5} className="resize-none rounded-2xl border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-cyan" placeholder="Tell us about your AI use cases, deployment timeline, and systems involved." />
      </label>
      <button type="submit" className="mt-6 w-full rounded-full bg-cyan px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white">
        Submit request
      </button>
      {submitted ? <p className="mt-4 text-sm text-cyan">Thanks. Your request is ready for the placeholder handler.</p> : null}
    </form>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-200">
      {label}
      <input name={name} type={type} required className="rounded-2xl border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-cyan" />
    </label>
  );
}
