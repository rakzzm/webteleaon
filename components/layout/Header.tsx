"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Code2, Menu, Star, X } from "lucide-react";
import { productCards } from "@/data/site";
import { resourceCards } from "@/data/resources";
import { companyCards } from "@/data/company";
import { TeleaonLogo } from "@/components/ui/TeleaonLogo";
import { cn } from "@/lib/utils";

const menus = [
  { label: "Products", href: "/products", items: productCards },
  { label: "Resources", href: "/resources", items: resourceCards },
  { label: "Company", href: "/company", items: companyCards },
  { label: "Pricing", href: "/pricing" }
];

function MenuPathBackground() {
  const paths = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    d: `M-${300 - i * 8} -${118 + i * 7}C-${260 - i * 8} ${40 + i * 4} ${72 - i * 5} ${100 + i * 4} ${
      176 + i * 10
    } ${188 - i * 2}C${318 + i * 8} ${306 - i * 4} ${462 + i * 9} ${238 - i * 6} ${642 + i * 8} ${312 - i * 4}`,
    width: 0.5 + i * 0.04
  }));

  return (
    <svg className="absolute inset-0 h-full w-full text-slate-950/35" viewBox="0 0 696 316" fill="none" aria-hidden="true">
      {paths.map((path) => (
        <path key={path.id} d={path.d} stroke="currentColor" strokeWidth={path.width} strokeOpacity={0.09 + path.id * 0.018} />
      ))}
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();

  return <HeaderInner key={pathname} />;
}

function HeaderInner() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const closeMenus = () => {
    setOpen(false);
    setOpenMenu(null);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        closeMenus();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header ref={headerRef} className="sticky inset-x-0 top-0 z-50 border-b border-slate-200 bg-[linear-gradient(115deg,#ffffff_0%,#ffffff_44%,#f0fbff_70%,#fff1f9_100%)] shadow-[0_12px_44px_rgba(14,116,144,0.10)]">
      <div className="border-b border-slate-200/80 bg-white/80 py-3 text-center text-sm font-semibold text-cyan">
        Introducing Agentic AI Platform <span aria-hidden="true">›</span>
      </div>
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-cyan/60">
          <TeleaonLogo />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {menus.map((menu) => (
            <div
              key={menu.label}
              className="relative"
              onFocus={() => setOpenMenu(menu.items ? menu.label : null)}
            >
              {menu.items ? (
                <button
                  type="button"
                  onClick={() => setOpenMenu((current) => (current === menu.label ? null : menu.label))}
                  onMouseEnter={() => setOpenMenu(menu.label)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-cyan/10 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan/60",
                    openMenu === menu.label && "bg-cyan/10 text-slate-950"
                  )}
                  aria-expanded={openMenu === menu.label}
                  aria-haspopup="menu"
                >
                  {menu.label}
                  <ChevronDown className={cn("h-4 w-4 transition", openMenu === menu.label && "rotate-180")} aria-hidden="true" />
                </button>
              ) : (
                <Link
                  href={menu.href}
                  onClick={closeMenus}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-cyan/10 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan/60"
                >
                  {menu.label}
                </Link>
              )}
              {menu.items ? (
                <div
                  className={cn(
                    "fixed left-1/2 top-[8.75rem] w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 opacity-0 shadow-2xl backdrop-blur-2xl transition",
                    openMenu === menu.label ? "visible opacity-100" : "invisible pointer-events-none"
                  )}
                  onMouseEnter={() => setOpenMenu(menu.label)}
                  role="menu"
                >
                  <MenuPathBackground />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(40,199,232,0.12),transparent_32%),radial-gradient(circle_at_82%_26%,rgba(183,164,255,0.10),transparent_30%)]" />
                  <div className="relative z-10 p-5">
                    <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-3">
                      <Link href={menu.href} onClick={closeMenus} className="text-sm font-semibold text-cyan hover:text-slate-950">
                        View all {menu.label}
                      </Link>
                      <button type="button" onClick={() => setOpenMenu(null)} className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:text-slate-950" aria-label={`Close ${menu.label} menu`}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className={cn("grid gap-3", menu.items.length > 4 ? "grid-cols-3" : "grid-cols-2")}>
                      {menu.items.map((item) => (
                        <Link key={item.href} href={item.href} onClick={closeMenus} className="rounded-xl border border-slate-200/85 bg-white/80 p-4 shadow-sm backdrop-blur-md transition hover:border-cyan/40 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan/60" role="menuitem">
                          <div className="text-sm font-semibold text-slate-950">{item.title}</div>
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{item.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="https://github.com/" className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-600 shadow-sm transition hover:border-cyan/40 hover:text-slate-950">
            <Code2 className="h-4 w-4" />
            teleaon / agents
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs">
              <Star className="h-3 w-3" /> 10.3K
            </span>
          </a>
          <Link href="/contact-us" onClick={closeMenus} className="rounded-md border border-slate-300 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-cyan/50">
            Contact sales
          </Link>
          <Link href="/start-building" onClick={closeMenus} className="rounded-md bg-cyan px-4 py-3 text-sm font-semibold text-ink shadow-[0_14px_30px_rgba(40,199,232,0.28)] transition hover:bg-slate-950 hover:text-white">
            Start building
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-900 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle mobile menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="relative overflow-hidden border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
          <MenuPathBackground />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(40,199,232,0.13),transparent_34%),radial-gradient(circle_at_84%_34%,rgba(183,164,255,0.10),transparent_30%)]" />
          <div className="relative z-10 space-y-4">
            {menus.map((menu) => (
              <div key={menu.label}>
                <Link href={menu.href} onClick={() => setOpen(false)} className="block py-2 text-base font-semibold text-slate-950">
                  {menu.label}
                </Link>
                {menu.items ? (
                  <div className="mt-2 grid gap-2">
                    {menu.items.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl border border-slate-200/85 bg-white/80 p-4 text-sm text-slate-700 shadow-sm backdrop-blur-md">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <div className="grid gap-3 border-t border-slate-200 pt-4">
              <Link href="/contact-us" onClick={() => setOpen(false)} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-4 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-md">
                Contact sales
              </Link>
              <Link href="/start-building" onClick={() => setOpen(false)} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan px-4 text-sm font-semibold text-ink shadow-[0_14px_30px_rgba(40,199,232,0.28)]">
                Start building
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
