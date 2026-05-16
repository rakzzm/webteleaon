import type { Metadata } from "next";
import { BeamsBackground } from "@/components/sections/BeamsBackground";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Teleaon AI to request a demo, ask for support, or discuss AI partnerships."
};

export default function ContactPage() {
  return (
    <main className="contact-shadow-page">
      <section className="hero-section relative min-h-screen overflow-hidden px-5 py-20 sm:px-6 lg:px-8">
        <BeamsBackground intensity="strong" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_38%,rgba(40,199,232,0.16),transparent_32%),radial-gradient(circle_at_20%_20%,rgba(224,0,131,0.12),transparent_26%),linear-gradient(180deg,rgba(2,6,23,0.20),rgba(2,6,23,0.58))]" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-7xl flex-col justify-center">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-balance text-5xl font-bold tracking-normal text-white sm:text-7xl lg:text-8xl">
              Contact Teleaon AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              Let’s design the AI system your enterprise can actually deploy.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-panel-section relative px-5 pb-20 sm:px-6 lg:px-8">
        <BeamsBackground intensity="medium" className="opacity-95" />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(2,6,23,0.62),rgba(2,6,23,0.84))]" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="contact-info-panel">
            <h2 className="text-balance text-3xl font-semibold text-white sm:text-5xl">Start the conversation</h2>
            <p className="mt-5 text-base leading-8 text-slate-200">
              Tell us about your workflows, data environment, governance needs, and business goals. A deployment specialist will route your request to the right team.
            </p>
            <div className="mt-8 space-y-4 text-sm text-slate-200">
              <div className="contact-detail-card">
                <div className="font-semibold text-white">Company email</div>
                <div className="mt-1">info@teleaon.ai</div>
              </div>
              <div className="contact-detail-card">
                <div className="font-semibold text-white">Phone</div>
                <div className="mt-1">+1 (555) 019-2048</div>
              </div>
              <div className="contact-detail-card">
                <div className="font-semibold text-white">Office</div>
                <div className="mt-1">
                  TELEAON AI SDN BHD (202501027023 - 1628435-V), BO1-A-09, Menara 2, KL Eco City, 3, Jalan Bangsar, 59200 Kuala Lumpur, W.P. Kuala Lumpur, Malaysia.
                </div>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
