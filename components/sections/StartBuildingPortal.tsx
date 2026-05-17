"use client";

import { useEffect, useMemo, useState } from "react";
import { getProviders, getSession, signIn, signOut } from "next-auth/react";
import { ArrowRight, Bot, Building2, CheckCircle2, HeartPulse, LockKeyhole, Mail, Megaphone, MessageSquareText, Mic2, PanelRightOpen, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { platformRedirects } from "@/lib/platform-redirects";

type AuthMode = "signin" | "signup";
type AuthProvider = "google" | "microsoft" | "email";

const platforms = [
  {
    name: "Contact Center Platform",
    href: platformRedirects.contactCenter,
    launchUrls: [platformRedirects.contactCenterAdmin, platformRedirects.contactCenterTenant],
    icon: PanelRightOpen,
    accent: "bg-cyan",
    rows: [
      ["Service provider", "Demo super admin portal"],
      ["Tenant workspace", "Demo tenant portal"],
      ["Opens", "Both portals in new tabs"]
    ]
  },
  {
    name: "Healthcare Platform",
    href: platformRedirects.healthcare,
    icon: HeartPulse,
    accent: "bg-emerald-400",
    rows: [
      ["Channels", "Patient calls, reminders, intake"],
      ["Workflows", "Triage, follow-up, care coordination"],
      ["Best for", "Clinics, hospitals, healthcare groups"]
    ]
  },
  {
    name: "Gen AI Platform",
    href: platformRedirects.genAi,
    icon: Sparkles,
    accent: "bg-fuchsia-400",
    rows: [
      ["Channels", "Docs, knowledge bases, copilots"],
      ["Workflows", "RAG, citations, policy controls"],
      ["Best for", "Knowledge automation and content"]
    ]
  },
  {
    name: "Agentic Voice Platform",
    href: platformRedirects.agenticVoice,
    icon: Mic2,
    accent: "bg-sky-400",
    rows: [
      ["Channels", "Inbound and outbound voice"],
      ["Workflows", "Qualification, booking, escalation"],
      ["Best for", "Realtime phone automation"]
    ]
  },
  {
    name: "Agentic Chat Platform",
    href: platformRedirects.agenticChat,
    icon: MessageSquareText,
    accent: "bg-violet-400",
    rows: [
      ["Channels", "Website chat, app chat, messaging"],
      ["Workflows", "Support, sales, onboarding"],
      ["Best for", "Digital customer conversations"]
    ]
  },
  {
    name: "Agentic Campaign Manager Platform",
    href: platformRedirects.campaignManager,
    icon: Megaphone,
    accent: "bg-amber-300",
    rows: [
      ["Channels", "Campaigns, email, nurture flows"],
      ["Workflows", "Audience segments, outreach, follow-up"],
      ["Best for", "Growth, lifecycle, and sales teams"]
    ]
  }
];

export function StartBuildingPortal() {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [provider, setProvider] = useState<AuthProvider>("email");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionEmail, setSessionEmail] = useState("");
  const [authError, setAuthError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [verificationNotice, setVerificationNotice] = useState("");
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [availableProviders, setAvailableProviders] = useState<Record<string, boolean>>({});
  const userLabel = useMemo(() => sessionEmail || email.trim() || `${provider[0].toUpperCase()}${provider.slice(1)} workspace`, [email, provider, sessionEmail]);

  useEffect(() => {
    let isMounted = true;

    Promise.all([getSession(), getProviders()])
      .then(([session, providers]) => {
        if (!isMounted) return;

        if (session?.user?.email) {
          setSessionEmail(session.user.email);
          setIsLoggedIn(true);
        }

        setAvailableProviders(
          Object.fromEntries(Object.keys(providers || {}).map((providerId) => [providerId, true]))
        );
      })
      .catch(() => {
        if (isMounted) {
          setAvailableProviders({});
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const authenticateWithOAuth = async (nextProvider: "google" | "azure-ad", label: AuthProvider) => {
    setProvider(label);
    setAuthError("");

    if (!availableProviders[nextProvider]) {
      setAuthError(
        nextProvider === "google"
          ? "Google login is ready, but Google OAuth credentials need to be added before it can redirect."
          : "Microsoft 365 and Outlook login is ready, but Microsoft OAuth credentials need to be added before it can redirect."
      );
      return;
    }

    await signIn(nextProvider, { callbackUrl: "/start-building" });
  };

  const requestEmailVerification = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    setProvider("email");
    setAuthError("");
    setVerificationNotice("");
    setIsVerifyingEmail(true);

    try {
      const response = await fetch("/api/auth/email-verification/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          name: normalizedEmail.split("@")[0]
        })
      });
      const payload = (await response.json()) as { message?: string; devCode?: string };

      if (!response.ok) {
        setAuthError(payload.message || "Could not send verification code.");
        return;
      }

      setVerificationStarted(true);
      setVerificationNotice(payload.devCode ? `${payload.message || "Verification code ready."} Code: ${payload.devCode}` : payload.message || "Verification code sent. Please check your email.");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Could not send verification code.");
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const confirmEmailVerification = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    setAuthError("");
    setVerificationNotice("");
    setIsVerifyingEmail(true);

    try {
      const verificationResponse = await fetch("/api/auth/email-verification/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          code: verificationCode
        })
      });
      const verificationPayload = (await verificationResponse.json()) as { message?: string };

      if (!verificationResponse.ok) {
        setAuthError(verificationPayload.message || "Verification failed.");
        return;
      }

      const result = await signIn("email", {
        email: normalizedEmail,
        name: normalizedEmail.split("@")[0],
        redirect: false,
        callbackUrl: "/start-building"
      });

      if (result?.error) {
        setAuthError("Email was verified, but sign in could not complete. Please try again.");
        return;
      }

      setSessionEmail(normalizedEmail);
      setIsLoggedIn(true);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Verification failed.");
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const authenticate = async (nextProvider: AuthProvider) => {
    setProvider(nextProvider);
    if (nextProvider === "google") {
      await authenticateWithOAuth("google", "google");
      return;
    }

    if (nextProvider === "microsoft") {
      await authenticateWithOAuth("azure-ad", "microsoft");
      return;
    }

    if (email.trim()) {
      await requestEmailVerification();
    }
  };

  const openPlatform = (platform: (typeof platforms)[number]) => {
    if ("launchUrls" in platform && platform.launchUrls?.length) {
      platform.launchUrls.forEach((url) => {
        window.open(url, "_blank", "noopener,noreferrer");
      });
      return;
    }

    window.open(platform.href, "_blank", "noopener,noreferrer");
  };

  if (isLoggedIn) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-[#f7fbff] px-5 py-24 text-slate-950 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(40,199,232,0.20),transparent_28%),radial-gradient(circle_at_84%_14%,rgba(224,0,131,0.12),transparent_26%),linear-gradient(180deg,#ffffff_0%,#eef8ff_48%,#ffffff_100%)]" />
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-cyan" />
                Signed in as {userLabel}
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
                Choose the Teleaon platform you want to access
              </h1>
            </div>
            <button
              type="button"
              onClick={async () => {
                await signOut({ redirect: false });
                setSessionEmail("");
                setIsLoggedIn(false);
              }}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan hover:text-slate-950"
            >
              Switch account
            </button>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {platforms.map((platform) => {
              const Icon = platform.icon;

              return (
                <article
                  key={platform.name}
                  role="button"
                  tabIndex={0}
                  onClick={() => openPlatform(platform)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openPlatform(platform);
                    }
                  }}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-cyan/40 focus:outline-none focus:ring-2 focus:ring-cyan/60"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-5">
                    <div className="flex items-center gap-3">
                      <span className={cn("grid h-11 w-11 place-items-center rounded-xl text-slate-950", platform.accent)}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <h2 className="text-xl font-semibold text-slate-950">{platform.name}</h2>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-600 transition group-hover:border-cyan group-hover:bg-cyan group-hover:text-slate-950" aria-hidden="true">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  <table className="w-full border-collapse text-left text-sm">
                    <tbody>
                      {platform.rows.map(([label, value]) => (
                        <tr key={label} className="border-b border-slate-100 last:border-0">
                          <th className="w-32 px-5 py-3 font-semibold text-slate-500">{label}</th>
                          <td className="px-5 py-3 text-slate-700">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(40,199,232,0.24),transparent_26%),radial-gradient(circle_at_80%_24%,rgba(224,0,131,0.18),transparent_30%),linear-gradient(135deg,#020617_0%,#111827_48%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1fr_500px]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan backdrop-blur-md">
            <ShieldCheck className="h-4 w-4" />
            Secure Teleaon workspace access
          </div>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-normal sm:text-6xl lg:text-7xl">
            Start building with your Teleaon platform workspace
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Sign in to choose the product platform your team wants to access.
          </p>
          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {["SSO ready", "Role access", "Audit trails"].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-sm font-semibold text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.08] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.38)] backdrop-blur-2xl">
          <div className="rounded-2xl bg-white p-5 text-slate-950">
            <div className="flex rounded-xl bg-slate-100 p-1">
              {(["signin", "signup"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setAuthMode(mode)}
                  className={cn("min-h-11 flex-1 rounded-lg text-sm font-semibold transition", authMode === mode ? "bg-slate-950 text-white shadow-sm" : "text-slate-600 hover:text-slate-950")}
                >
                  {mode === "signin" ? "Sign in" : "Sign up"}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-3">
              <button type="button" onClick={() => authenticate("google")} className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:border-cyan">
                <Bot className="h-4 w-4 text-cyan" />
                Continue with Gmail or Google Workspace
              </button>
              <button type="button" onClick={() => authenticate("microsoft")} className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:border-cyan">
                <Building2 className="h-4 w-4 text-cyan" />
                Continue with Microsoft 365 or Outlook
              </button>
            </div>

            <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              Email
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                if (verificationStarted) {
                  void confirmEmailVerification();
                } else {
                  void authenticate("email");
                }
              }}
            >
              <label className="block text-sm font-semibold text-slate-700" htmlFor="start-building-email">
                Work email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="start-building-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setVerificationStarted(false);
                    setVerificationCode("");
                    setVerificationNotice("");
                    setAuthError("");
                  }}
                  placeholder="name@company.com"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan"
                />
              </div>
              {verificationStarted ? (
                <div>
                  <label className="block text-sm font-semibold text-slate-700" htmlFor="start-building-code">
                    Verification code
                  </label>
                  <input
                    id="start-building-code"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    required
                    value={verificationCode}
                    onChange={(event) => setVerificationCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="6 digit code"
                    className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm tracking-[0.35em] text-slate-900 outline-none transition placeholder:tracking-normal placeholder:text-slate-400 focus:border-cyan"
                  />
                </div>
              ) : null}
              <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-950 hover:text-white">
                {isVerifyingEmail ? "Please wait..." : verificationStarted ? "Verify email and continue" : authMode === "signin" ? "Send email code" : "Create account"}
                <LockKeyhole className="h-4 w-4" />
              </button>
              {verificationStarted ? (
                <button
                  type="button"
                  onClick={() => {
                    setVerificationStarted(false);
                    setVerificationCode("");
                    setVerificationNotice("");
                    setAuthError("");
                  }}
                  className="w-full text-sm font-semibold text-slate-500 transition hover:text-slate-950"
                >
                  Use a different email
                </button>
              ) : null}
              {verificationNotice ? (
                <p className="rounded-xl border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm font-semibold text-slate-700">
                  {verificationNotice}
                </p>
              ) : null}
              {authError ? (
                <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
                  {authError}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
