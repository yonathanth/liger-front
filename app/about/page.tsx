import { PublicIcon } from "../components/PublicIcon";
import type { Metadata } from "next";
import Link from "next/link";
import { shareMeta } from "@/lib/seo";
import { SchemaComponent } from "@/lib/schema-component";
import { breadcrumbSchema } from "@/lib/schemas";
import { SiteNav } from "../components/SiteNav";
import { SmoothScroll } from "../components/SmoothScroll";
import { SiteFooter } from "../components/SiteFooter";
import { JoinCta } from "../components/JoinCta";
import { PageHero } from "../components/PageHero";
import { Carousel } from "../components/Carousel";
import { ScrollReveal } from "../components/ScrollReveal";
import { ABOUT_INTRO, ABOUT_STORY, STAFF, VALUES } from "@/lib/content";
import { BUSINESS_AREA, OPENING_HOURS_SCHEMA, SITE_BASE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `About ${SITE_NAME} | Our story & staff | ${BUSINESS_AREA}`,
  description: `Meet the team at ${SITE_NAME} in ${BUSINESS_AREA}. ${ABOUT_INTRO}`,
  ...shareMeta({ title: `About ${SITE_NAME}`, description: ABOUT_INTRO, path: "/about" }),
  alternates: { canonical: `${SITE_BASE_URL}/about` },
};
const daysOpen = OPENING_HOURS_SCHEMA.reduce((n, h) => n + (Array.isArray(h.dayOfWeek) ? h.dayOfWeek.length : 1), 0);
const hoursPerDay = (() => {
  const h = OPENING_HOURS_SCHEMA[0];
  const [oh, om] = h.opens.split(":").map(Number);
  const [ch, cm] = h.closes.split(":").map(Number);
  return Math.round((ch * 60 + cm - (oh * 60 + om)) / 60);
})();

export default function AboutPage() {
  return (
    <div className="v2 min-h-screen">
      <SmoothScroll />
      <SiteNav />
      <main>
        <PageHero eyebrow={`About ${SITE_NAME}`} title={<>Built around<br />showing up.</>} intro={ABOUT_INTRO} image="/images/story.jpg" />
        <section className="frame grid grid-cols-2 gap-y-8 px-5 pb-14 text-center md:grid-cols-4 md:px-10 md:pb-20">
          {[
            { value: String(daysOpen), label: "Days a week" },
            { value: String(hoursPerDay), label: "Hours a day" },
            { value: OPENING_HOURS_SCHEMA[0].opens, label: "Doors open" },
            { value: OPENING_HOURS_SCHEMA[0].closes, label: "Doors close" },
          ].map((s, i) => <div key={s.label} className={i % 2 === 1 ? "border-l border-night/10 px-3" : "px-3 md:border-l md:border-night/10 md:first:border-l-0"}><p className="text-4xl font-semibold tracking-tight md:text-5xl">{s.value}</p><p className="mt-2 text-sm text-night/55">{s.label}</p></div>)}
        </section>

        <section className="bg-cloud">
          <div className="frame grid items-center gap-10 px-5 py-20 md:px-10 md:py-24 lg:grid-cols-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/facility-4.jpg" alt="The training floor at Liger Gym" className="aspect-[4/5] w-full rounded-[2rem] object-cover" loading="lazy" />
            </ScrollReveal>
            <ScrollReveal className="lg:col-span-7" delay={100}><p className="eyebrow eyebrow-dark">Our story</p><h2 className="section-title mt-5">Driven by purpose.<br />Built for your progress.</h2><div className="mt-7 space-y-5">{ABOUT_STORY.map((p) => <p key={p} className="section-copy">{p}</p>)}</div></ScrollReveal>
          </div>
        </section>

        <section className="frame px-5 py-20 md:px-10 md:py-24">
          <ScrollReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow eyebrow-dark">What we offer</p><h2 className="section-title mt-4">Find what moves you.</h2></div><p className="section-copy max-w-sm">Everything you need to train, under one roof. Pick what suits you, or mix and match.</p></ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">{[
            { title: "Strength training", detail: "Free weights, racks and machines for every level", img: "/images/facility-3.jpg" },
            { title: "Cardio", detail: "Treadmills, bikes and conditioning, every day", img: "/images/facility-1.jpg" },
            { title: "Group classes", detail: "Coached sessions through the week", img: "/images/facility-2.jpg" },
          ].map((item, i) => <ScrollReveal key={item.title} delay={i * 90}><Link href="/services" className="service-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.img} alt={`${item.title} at Liger Gym`} loading="lazy" />
            <div className="service-card-body"><div className="flex items-center justify-between gap-3"><h3>{item.title}</h3><span className="round-arrow" aria-hidden="true">↗</span></div><p>{item.detail}</p></div>
          </Link></ScrollReveal>)}</div>
        </section>

        <section className="bg-night py-20 text-white md:py-24">
          <ScrollReveal className="frame px-5 md:px-10"><div className="mx-auto max-w-2xl text-center"><p className="eyebrow">Our people</p><h2 className="section-title mt-4">The people behind<br />the progress.</h2><p className="mt-5 text-white/60">On the floor every day to help you train well and keep coming back.</p></div></ScrollReveal>
          <ScrollReveal delay={100} className="frame mt-12"><Carousel tone="dark">{STAFF.map((person, i) => <figure key={`${person.name}-${i}`} data-card className="w-[70vw] max-w-[18rem] shrink-0 sm:w-[17rem]"><div className="overflow-hidden rounded-[1.5rem] bg-night-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={person.photo} alt={person.name} className="aspect-[4/5] w-full object-cover" loading="lazy" />
          </div><figcaption className="mt-5 text-center"><p className="text-lg font-semibold">{person.name}</p><p className="mt-1 text-sm text-white/60">{person.role}</p></figcaption></figure>)}</Carousel></ScrollReveal>
        </section>

        <section className="frame px-5 py-20 md:px-10 md:py-24"><ScrollReveal><p className="eyebrow eyebrow-dark">What we believe</p><h2 className="section-title mt-4">The basics, done with care.</h2></ScrollReveal><div className="mt-12 grid gap-8 md:grid-cols-3">{VALUES.map((value) => <ScrollReveal key={value.title} className="border-t border-night/10 pt-7"><span className="value-icon"><PublicIcon name={value.icon} /></span><h3 className="mt-5 text-xl font-semibold">{value.title}</h3><p className="section-copy mt-3">{value.body}</p></ScrollReveal>)}</div></section>
        <JoinCta />
      </main>
      <SiteFooter />
      <SchemaComponent schema={breadcrumbSchema([{ name: "Home", url: SITE_BASE_URL }, { name: "About", url: `${SITE_BASE_URL}/about` }])} />
    </div>
  );
}
