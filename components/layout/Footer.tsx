import Link from "next/link";
import { Code2, MessageCircle, Network, Send } from "lucide-react";
import { productCards, solutionCards, useCaseCards } from "@/data/site";
import { resourceCards } from "@/data/resources";
import { companyCards } from "@/data/company";
import { legalLinks } from "@/data/legal";
import { DottedSurface } from "@/components/sections/DottedSurface";
import { TeleaonLogo } from "@/components/ui/TeleaonLogo";

export function Footer() {
  const platformLinks = [
    { title: "Pricing", href: "/pricing" },
    { title: "Contact Sales", href: "/contact-us" },
    { title: "Resources", href: "/resources" },
    { title: "Library", href: "/library" }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-[linear-gradient(115deg,#ffffff_0%,#f7fdff_38%,#eefbff_68%,#fff0f8_100%)]">
      <DottedSurface className="z-0 opacity-100 mix-blend-multiply" particleColor="dark" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_18%,rgba(40,199,232,0.10),transparent_30%),radial-gradient(circle_at_84%_28%,rgba(224,0,131,0.09),transparent_32%)]" aria-hidden="true" />
      <div className="footer-dotted-field pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" />
      <div className="footer-dotted-horizon pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-96" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid max-w-[94rem] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_3fr] lg:px-6 xl:px-8">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <TeleaonLogo />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
            Enterprise AI systems for teams that need secure agents, scalable infrastructure, and measurable automation outcomes.
          </p>
          <form className="mt-6 flex max-w-sm gap-2">
            <label className="sr-only" htmlFor="newsletter">Email address</label>
            <input id="newsletter" type="email" placeholder="Work email" className="min-w-0 flex-1 rounded-full border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-950 shadow-sm outline-none placeholder:text-slate-400 focus:border-cyan" />
            <button type="submit" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan text-ink shadow-[0_14px_30px_rgba(40,199,232,0.28)] transition hover:bg-slate-950 hover:text-white" aria-label="Subscribe">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[repeat(5,minmax(0,1fr))_minmax(20rem,1.7fr)]">
          <FooterColumn title="Products" links={productCards} />
          <FooterColumn title="Resources" links={resourceCards} />
          <FooterColumn title="Company" links={companyCards} />
          <FooterColumn title="Use Cases" links={useCaseCards.slice(0, 5)} />
          <FooterColumn title="Platform" links={platformLinks} />
          <div>
            <h2 className="text-sm font-semibold text-slate-950">Solutions</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              {solutionCards.slice(0, 3).map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-cyan">{link.title}</Link>
              ))}
              <Link href="/use-case" className="hover:text-cyan">Use Cases</Link>
              <span>info@teleaon.ai</span>
              <span>+1 (555) 019-2048</span>
              <span className="max-w-md leading-6">
                TELEAON AI SDN BHD (202501027023 - 1628435-V), BO1-A-09, Menara 2, KL Eco City, 3, Jalan Bangsar, 59200 Kuala Lumpur, W.P. Kuala Lumpur, Malaysia.
              </span>
            </div>
            <div className="mt-5 flex gap-3 text-slate-600">
              {[
                { Icon: Network, href: "/company/partners", label: "Partners" },
                { Icon: MessageCircle, href: "/contact-us", label: "Contact" },
                { Icon: Code2, href: "/resources/documentation", label: "Documentation" }
              ].map(({ Icon, href, label }) => (
                <Link key={label} href={href} className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white/70 shadow-sm transition hover:border-cyan/50 hover:text-cyan" aria-label={label}>
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 border-t border-slate-200/80 bg-white/55 px-5 py-6 text-sm text-slate-500 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[94rem] flex-col items-center justify-between gap-4 text-center lg:flex-row lg:text-left">
          <span>© 2026 Teleaon AI. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-cyan">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { title: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3 text-sm text-slate-600">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-cyan">
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
