import type { Metadata } from "next";
import { shareMeta } from "@/lib/seo";
import { SchemaComponent } from "@/lib/schema-component";
import { breadcrumbSchema } from "@/lib/schemas";
import { SiteNav } from "../components/SiteNav";
import { SmoothScroll } from "../components/SmoothScroll";
import { SiteFooter } from "../components/SiteFooter";
import { JoinCta } from "../components/JoinCta";
import { PageHero } from "../components/PageHero";
import { Carousel } from "../components/Carousel";
import { ABOUT_INTRO, ABOUT_STORY, STAFF, VALUES } from "@/lib/content";
import { BUSINESS_AREA, OPENING_HOURS_SCHEMA, SITE_BASE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `About ${SITE_NAME} | Our story & staff | ${BUSINESS_AREA}`,
  description: `Meet the team at ${SITE_NAME} in ${BUSINESS_AREA}. ${ABOUT_INTRO}`,
  ...shareMeta({
    title: `About ${SITE_NAME}`,
    description: ABOUT_INTRO,
    path: "/about",
  }),
  alternates: { canonical: `${SITE_BASE_URL}/about` },
};

const daysOpen = OPENING_HOURS_SCHEMA.reduce(
  (n, h) => n + (Array.isArray(h.dayOfWeek) ? h.dayOfWeek.length : 1),
  0,
);
const hoursPerDay = (() => {
  const h = OPENING_HOURS_SCHEMA[0];
  const [oh, om] = h.opens.split(":").map(Number);
  const [ch, cm] = h.closes.split(":").map(Number);
  return Math.round((ch * 60 + cm - (oh * 60 + om)) / 60);
})();

const dots = {
  backgroundImage: "radial-gradient(rgba(14,14,14,0.09) 1px, transparent 1px)",
  backgroundSize: "18px 18px",
};

export default function AboutPage() {
  return (
    <div className="v2 min-h-screen">
      <SmoothScroll />
      <SiteNav />

      <main>
        <PageHero
          eyebrow={`About ${SITE_NAME}`}
          title={
            <>
              Built around
              <br />
              showing up
            </>
          }
          intro={ABOUT_INTRO}
        />

        {/* Story */}
        <section style={dots}>
          <div className="frame grid gap-8 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
            <p className="mono text-lime-deep md:col-span-4">Our story</p>
            <div className="space-y-6 md:col-span-8">
              {ABOUT_STORY.map((p, i) => (
                <p key={p} className="text-2xl leading-[1.35] font-light tracking-tight md:text-[2rem] md:leading-[1.3]">
                  {i === 0 && <span className="inline-block w-10 md:w-24" aria-hidden />}
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Facts */}
        <section className="bg-lime text-night">
          <div className="frame grid grid-cols-2 px-5 md:grid-cols-4 md:px-10">
            {[
              { value: String(daysOpen), label: "Days a week" },
              { value: String(hoursPerDay), label: "Hours a day" },
              { value: OPENING_HOURS_SCHEMA[0].opens, label: "Doors open" },
              { value: OPENING_HOURS_SCHEMA[0].closes, label: "Doors close" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`py-12 md:py-16 ${i % 2 === 1 ? "border-l border-night/15 pl-5" : ""} ${
                  i > 1 ? "border-t border-night/15 md:border-t-0" : ""
                } ${i > 0 ? "md:border-l md:pl-8" : ""}`}
              >
                <p className="text-5xl font-light tracking-tight md:text-6xl">{s.value}</p>
                <p className="mono mt-3 text-night/65">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="frame px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mono text-lime-deep">What we stand for</p>
            <h2 className="mt-4 text-4xl leading-[1.1] font-light tracking-tight md:text-5xl">
              Three things we never skip
            </h2>
          </div>
          <ol className="mt-14 grid gap-3 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <li key={v.title} className="flex flex-col rounded-[1.25rem] bg-cloud p-7 md:min-h-64">
                <div className="flex items-center justify-between">
                  <span className="mono text-night/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="material-symbols-outlined text-lime-deep">{v.icon}</span>
                </div>
                <h3 className="mt-auto pt-12 text-2xl font-light tracking-tight">{v.title}</h3>
                <p className="mono mt-3 text-night/55">{v.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Staff */}
        <section className="bg-night-2 py-24 text-white md:py-32">
          <div className="frame px-5 md:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mono text-lime">Our staff</p>
              <h2 className="mt-4 text-4xl leading-[1.1] font-light tracking-tight md:text-5xl">
                The people behind the progress
              </h2>
              <p className="mono mx-auto mt-5 max-w-md text-white/50">
                On the floor every day to help you train well and keep coming back.
              </p>
            </div>
          </div>
          <div className="frame mt-14">
            <Carousel tone="dark">
              {STAFF.map((person, i) => (
                <figure
                  key={`${person.name}-${i}`}
                  data-card
                  className="w-[70vw] max-w-[18rem] shrink-0 sm:w-[17rem]"
                >
                  <div className="overflow-hidden rounded-[1.25rem] bg-night">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={person.photo} alt={person.name} className="photo aspect-[4/5] w-full object-cover" />
                  </div>
                  <figcaption className="mt-4 text-center">
                    <p className="text-lg font-light">{person.name}</p>
                    <p className="mono mt-1 text-white/45">{person.role}</p>
                  </figcaption>
                </figure>
              ))}
            </Carousel>
          </div>
        </section>

        <JoinCta />
      </main>

      <SiteFooter />

      <SchemaComponent
        schema={breadcrumbSchema([
          { name: "Home", url: SITE_BASE_URL },
          { name: "About", url: `${SITE_BASE_URL}/about` },
        ])}
      />
    </div>
  );
}
