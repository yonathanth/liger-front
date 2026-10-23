"use client";

import { useState } from "react";
import Link from "next/link";
import { ClassTimetable } from "../components/ClassTimetable";
import { JoinCta } from "../components/JoinCta";
import { PageHero } from "../components/PageHero";
import { PlanCard } from "../components/PlanCard";
import { FaqList } from "../components/FaqList";
import { ScrollReveal } from "../components/ScrollReveal";
import { groupPlans, titleCase, type Catalog } from "@/lib/catalog";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";
import { servicesFaq } from "@/lib/faq-content";

export function ServicesContent({ catalog }: { catalog: Catalog }) {
  const groups = groupPlans(catalog.plans);
  const { classes } = catalog;

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter plans based on selected category
  const filteredPlans = selectedCategory === "all"
    ? catalog.plans
    : catalog.plans.filter(plan => plan.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <main>
      <PageHero
        eyebrow="Membership"
        title={
          <>
            Pick a plan,
            <br />
            start training
          </>
        }
        intro="Prices straight from our front desk. Choose a plan, register online and pay when you come in."
      />

      {/* Plans */}
      <section className="frame px-5 pt-8 pb-24 md:px-10 md:pb-32">
        {groups.length > 1 && (
          <div className="no-scrollbar -mx-1 mb-8 flex gap-1.5 overflow-x-auto px-1 pb-1">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`mono shrink-0 rounded-full px-3.5 py-2 transition-colors ${
                selectedCategory === "all"
                  ? "bg-night text-white"
                  : "bg-cloud text-night/65 hover:text-night"
              }`}
            >
              All
            </button>
            {groups.map((g) => (
              <button
                key={g.category}
                type="button"
                onClick={() => setSelectedCategory(g.category)}
                className={`mono shrink-0 rounded-full px-3.5 py-2 transition-colors ${
                  selectedCategory === g.category
                    ? "bg-night text-white"
                    : "bg-cloud text-night/65 hover:text-night"
                }`}
              >
                {titleCase(g.category)}
              </button>
            ))}
            {classes.length > 0 && (
              <a
                href="#classes"
                className="mono shrink-0 rounded-full bg-cloud px-3.5 py-2 text-night/65 transition-colors hover:text-night"
              >
                Classes
              </a>
            )}
          </div>
        )}

        {catalog.plans.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-[1.25rem] bg-cloud p-10 text-center">
            <p className="mono text-lime-deep">Membership</p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">Prices are being updated</p>
            <p className="mono mx-auto mt-4 max-w-sm text-night/55">
              Call us for current prices, or register and we will get back to you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <a href={`tel:${PHONE_E164}`} className="cta cta-dark">
                {PHONE_DISPLAY}
              </a>
              <Link href="/register" className="cta">
                Register
              </Link>
            </div>
          </div>
        ) : (
          <div
            key={selectedCategory}
            className="animate-fade-in grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr"
          >
            {filteredPlans.map((plan, i) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                className={`h-full animate-fade-in-up stagger-${Math.min(i + 1, 5)}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Timetable */}
      {classes.length > 0 && (
        <section id="classes" className="scroll-mt-24 bg-night-2 text-white">
          <ScrollReveal className="frame px-5 py-24 md:px-10 md:py-32">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mono text-lime">Timetable</p>
              <h2 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight md:text-5xl">Weekly classes</h2>
              <p className="mono mx-auto mt-5 max-w-md text-white/50">Included with membership unless the front desk says otherwise.</p>
            </div>
            <div className="mx-auto mt-14 max-w-4xl">
              <ClassTimetable classes={classes} tone="dark" />
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* FAQ */}
      <section className="frame grid gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <ScrollReveal className="md:col-span-4">
          <p className="mono text-lime-deep">Questions</p>
          <h2 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight md:text-5xl">Good to know</h2>
          <Link href="/faq" className="mono mt-6 inline-block text-night/60 hover:text-night hover:underline">
            All questions →
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={150} className="md:col-span-8">
          <FaqList items={servicesFaq} />
        </ScrollReveal>
      </section>

      <JoinCta title="Found your plan?" body="Register online and we'll call you to finish signing up." />
    </main>
  );
}
