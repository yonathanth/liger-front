"use client";

import { PublicIcon } from "./PublicIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PHONE_DISPLAY, PHONE_E164, SITE_NAME } from "@/lib/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Membership" },
  { href: "/about", label: "About us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="public-header">
      <div className="frame flex items-center justify-between gap-5 px-5 md:px-10">
        <Link href="/" className="brand-lockup" aria-label={`${SITE_NAME} home`} onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-wordmark.png" alt={SITE_NAME} width={100} height={36} className="h-8 w-auto object-contain" />
          <span className="hidden border-l border-white/25 pl-4 text-xs leading-relaxed text-white/65 sm:block">Built for strength.<br />Made for everyone.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={isActive(item.href) ? "nav-link is-active" : "nav-link"}>
              {item.label}
            </Link>
          ))}
          <Link href="/register" className="cta">Join Liger</Link>
        </nav>
        <button type="button" className="mobile-menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="public-mobile-menu" onClick={() => setOpen(!open)}>
          <PublicIcon name={open ? "close" : "menu"} />
        </button>
      </div>
      {open && (
        <nav id="public-mobile-menu" className="mobile-nav" aria-label="Mobile">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} onClick={() => setOpen(false)} className={isActive(item.href) ? "nav-link is-active" : "nav-link"}>
              {item.label}<span aria-hidden="true">↗</span>
            </Link>
          ))}
          <Link href="/register" className="cta justify-center" onClick={() => setOpen(false)}>Join Liger</Link>
          <a href={`tel:${PHONE_E164}`} className="py-3 text-center text-sm text-night/65">Call {PHONE_DISPLAY}</a>
        </nav>
      )}
    </header>
  );
}
