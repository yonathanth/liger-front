import Link from "next/link";
import { ClassTimetable } from "../components/ClassTimetable";
import { JoinCta } from "../components/JoinCta";
import { PageHero } from "../components/PageHero";
import { PlanCard } from "../components/PlanCard";
import { FaqList } from "../components/FaqList";
import { groupPlans, titleCase, type Catalog } from "@/lib/catalog";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";
import { servicesFaq } from "@/lib/faq-content";

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "plans";
}

export function ServicesContent({ catalog }: { catalog: Catalog }) {
  const groups = groupPlans(catalog.plans);
  // Add-ons are sold at the desk; the website shows membership plans only.
  const { classes } = catalog;

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
      >
        {groups.length > 1 && (
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Plan categories">
            {groups.map((g) => (
              <a
                key={g.category}
                href={`#${slug(g.category)}`}
                className="mono rounded-[0.6rem] bg-cloud px-3.5 py-2 text-night/75 transition-colors hover:bg-lime hover:text-night"
              >
                {titleCase(g.category)} <span className="text-night/40">{g.plans.length}</span>
              </a>
            ))}
            {classes.length > 0 && (
              <a
                href="#classes"
                className="mono rounded-[0.6rem] bg-cloud px-3.5 py-2 text-night/75 transition-colors hover:bg-lime hover:text-night"
              >
                Classes
              </a>
            )}
          </nav>
        )}
      </PageHero>

      {/* Plans */}
      <section className="frame space-y-20 px-5 pt-8 pb-24 md:px-10 md:pb-32">
        {groups.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-[1.25rem] bg-cloud p-10 text-center">
            <p className="mono text-lime-deep">Membership</p>
            <p className="mt-4 text-3xl font-light tracking-tight">Prices are being updated</p>
            <p className="mono mx-auto mt-4 max-w-sm text-night/55">
              Call us for current prices, or register and we’ll get back to you.
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
          groups.map((group) => (
            <div key={group.category} id={slug(group.category)} className="scroll-mt-28">
              <div className="flex items-end justify-between gap-4 border-b border-night/12 pb-5">
                <h2 className="text-3xl font-light tracking-tight md:text-4xl">{titleCase(group.category)}</h2>
                <p className="mono text-night/50">
                  {group.plans.length} plan{group.plans.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.plans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} className="min-h-[19rem]" />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Timetable */}
      {classes.length > 0 && (
        <section id="classes" className="scroll-mt-24 bg-night-2 text-white">
          <div className="frame px-5 py-24 md:px-10 md:py-32">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mono text-lime">Timetable</p>
              <h2 className="mt-4 text-4xl leading-[1.1] font-light tracking-tight md:text-5xl">Weekly classes</h2>
              <p className="mono mx-auto mt-5 max-w-md text-white/50">Included with membership unless the front desk says otherwise.</p>
            </div>
            <div className="mx-auto mt-14 max-w-4xl">
              <ClassTimetable classes={classes} tone="dark" />
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="frame grid gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-4">
          <p className="mono text-lime-deep">Questions</p>
          <h2 className="mt-4 text-4xl leading-[1.1] font-light tracking-tight md:text-5xl">Good to know</h2>
          <Link href="/faq" className="mono mt-6 inline-block text-night/60 hover:text-night hover:underline">
            All questions →
          </Link>
        </div>
        <div className="md:col-span-8">
          <FaqList items={servicesFaq} />
        </div>
      </section>

      <JoinCta title="Found your plan?" body="Register online and we’ll call you to finish signing up." />
    </main>
  );
}
