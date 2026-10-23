"use client";

import { useState } from "react";
import { SiteNav } from "../components/SiteNav";
import { SmoothScroll } from "../components/SmoothScroll";
import { SiteFooter } from "../components/SiteFooter";
import { PageHero } from "../components/PageHero";
import { FaqList } from "../components/FaqList";
import { ScrollReveal } from "../components/ScrollReveal";
import { faqContent, type FaqCategory } from "@/lib/faq-content";
import { PHONE_DISPLAY, PHONE_E164, SITE_NAME, SOCIAL_LINKS } from "@/lib/site";

const categories: { id: "all" | FaqCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "membership", label: "Membership" },
  { id: "payments", label: "Payments" },
  { id: "timings", label: "Hours & location" },
  { id: "trainers", label: "Training" },
];

export default function FAQPage() {
  const [active, setActive] = useState<"all" | FaqCategory>("all");
  const items = active === "all" ? faqContent : faqContent.filter((f) => f.category === active);

  return (
    <div className="v2 min-h-screen">
      <SmoothScroll />
      <SiteNav />

      <main>
        <PageHero
          eyebrow="FAQ"
          title={
            <>
              Questions,
              <br />
              answered
            </>
          }
          intro={`Memberships, payments, training and hours: everything about ${SITE_NAME} in one place.`}
        />

        <section className="frame grid gap-12 px-5 pt-4 pb-24 md:px-10 md:pb-32 lg:grid-cols-12">
          {/* min-w-0: let the column shrink so only the tab row scrolls, not the page. */}
          <div className="min-w-0 lg:col-span-8">
            <div className="no-scrollbar -mx-1 mb-8 flex gap-1.5 overflow-x-auto px-1 pb-1">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(c.id)}
                  className={`mono shrink-0 rounded-full px-3.5 py-2 transition-colors ${
                    active === c.id ? "bg-night text-white" : "bg-cloud text-night/65 hover:text-night"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div key={active} className="animate-fade-in">
              <FaqList items={items} />
            </div>
          </div>

          <aside className="lg:col-span-4">
            <ScrollReveal delay={150} className="rounded-[1.25rem] bg-night p-7 text-white lg:sticky lg:top-28">
              <p className="mono text-lime">Still have a question?</p>
              <p className="mt-6 text-2xl leading-snug font-semibold tracking-tight">
                Our front desk is happy to help. Just call or drop by.
              </p>
              <div className="mt-8 grid gap-2">
                <a href={`tel:${PHONE_E164}`} className="cta cta-lg justify-center">
                  {PHONE_DISPLAY}
                </a>
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta cta-lg cta-ghost justify-center"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </aside>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
