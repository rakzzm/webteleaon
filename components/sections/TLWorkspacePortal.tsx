"use client";

import { useState } from "react";
import { ArrowRight, BriefcaseBusiness, LockKeyhole, Mail, ShieldCheck, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

type WorkspaceMode = "signin" | "signup";

export function TLWorkspacePortal() {
  const [mode, setMode] = useState<WorkspaceMode>("signin");
  const [email, setEmail] = useState("info@teleaon.ai");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(mode === "signin" ? "/api/tl-workspace/login" : "/api/tl-workspace/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name
        })
      });
      const payload = (await response.json()) as { message?: string; redirectTo?: string };

      if (!response.ok) {
        setMessage(payload.message || "Could not open TL WorkSpace.");
        return;
      }

      window.location.href = payload.redirectTo || "/crm/";
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not open TL WorkSpace.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(40,199,232,0.34),transparent_30%),radial-gradient(circle_at_78%_8%,rgba(224,0,131,0.22),transparent_28%),linear-gradient(135deg,#020617_0%,#0f172a_48%,#06131f_100%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan shadow-[0_18px_70px_rgba(40,199,232,0.20)] backdrop-blur">
            <ShieldCheck className="h-4 w-4" />
            Private employee CRM workspace
          </div>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
            TL WorkSpace for Teleaon teams
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-300">
            Sign in to the internal Frappe CRM workspace for pipeline, accounts, contacts, tasks, and customer follow-up operations. Access is limited to Teleaon employee email addresses.
          </p>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {["CRM records", "Employee access", "Protected app"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-4 text-sm font-semibold text-white shadow-2xl backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/95 p-4 text-slate-950 shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:p-6">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex rounded-2xl bg-slate-100 p-1 text-sm font-semibold">
              {[
                { id: "signin" as const, label: "Sign in", Icon: LockKeyhole },
                { id: "signup" as const, label: "Create account", Icon: UserPlus }
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setMode(id);
                    setMessage("");
                  }}
                  className={cn(
                    "inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 transition",
                    mode === id ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-950"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {mode === "signup" ? (
                <label className="block text-sm font-semibold text-slate-700">
                  Full name
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-cyan"
                    placeholder="Employee name"
                  />
                </label>
              ) : null}

              <label className="block text-sm font-semibold text-slate-700">
                Teleaon email
                <div className="mt-2 flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-cyan">
                  <Mail className="h-4 w-4 text-cyan" />
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-base text-slate-950 outline-none"
                    placeholder="name@teleaon.ai"
                    type="email"
                  />
                </div>
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Password
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-cyan"
                  placeholder="Enter password"
                  type="password"
                />
              </label>
            </div>

            {message ? (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                {message}
              </div>
            ) : null}

            <button
              type="button"
              onClick={submit}
              disabled={isSubmitting}
              className="mt-6 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl bg-cyan px-5 text-base font-semibold text-slate-950 shadow-[0_20px_60px_rgba(40,199,232,0.35)] transition hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              <BriefcaseBusiness className="h-5 w-5" />
              {isSubmitting ? "Opening workspace..." : "Open TL WorkSpace"}
              <ArrowRight className="h-5 w-5" />
            </button>

            <p className="mt-4 text-center text-xs font-medium leading-5 text-slate-500">
              Employee accounts are stored in the Teleaon private OpenSearch workspace index.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
