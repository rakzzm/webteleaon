import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Teleaon AI to request a demo, ask for support, or discuss AI partnerships."
};

export default function ContactPage() {
  return (
    <>
      <Hero title="Contact Teleaon AI" headline="Let’s design the AI system your enterprise can actually deploy" subheadline="Tell us about your workflows, data environment, governance needs, and business goals. We will help map the right product path." visual="contact" secondaryHref="/library" secondaryLabel="Explore Resources" />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading title="Start the conversation" description="Use the form for demo requests, support inquiries, and partnership conversations. A deployment specialist will route your request to the right team." />
            <div className="space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="font-semibold text-white">Company email</div>
                <div className="mt-1">hello@teleaon.ai</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="font-semibold text-white">Phone</div>
                <div className="mt-1">+1 (555) 019-2048</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="font-semibold text-white">Office</div>
                <div className="mt-1">Enterprise AI Briefing Center, San Francisco, CA</div>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
