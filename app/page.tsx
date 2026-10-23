import { PublicIcon } from "./components/PublicIcon";
import Link from "next/link";
import type { Metadata } from "next";
import { shareMeta } from "@/lib/seo";
import { SiteNav } from "./components/SiteNav";
import { SmoothScroll } from "./components/SmoothScroll";
import { SiteFooter } from "./components/SiteFooter";
import { JoinCta } from "./components/JoinCta";
import { ClassTimetable } from "./components/ClassTimetable";
import { PlanCarousel } from "./components/PlanCarousel";
import { ScrollReveal } from "./components/ScrollReveal";
import { FaqList } from "./components/FaqList";
import { servicesFaq } from "@/lib/faq-content";
import { VALUES } from "@/lib/content";
import { SchemaComponent } from "@/lib/schema-component";
import { breadcrumbSchema } from "@/lib/schemas";
import { formatPrice, getCatalog, groupPlans, isCatchAllCategory, titleCase } from "@/lib/catalog";
import {
  BUSINESS_AREA, BUSINESS_CITY, BUSINESS_LOCATION_LINE, CURRENCY,
  GOOGLE_MAPS_DIRECTIONS_URL, GOOGLE_MAPS_EMBED_URL, OPENING_HOURS,
  PHONE_DISPLAY, PHONE_E164, SITE_BASE_URL, SITE_DESCRIPTION, SITE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Gym in ${BUSINESS_AREA}`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_BASE_URL },
  ...shareMeta({ title: `${SITE_NAME} | Gym in ${BUSINESS_AREA}`, description: SITE_DESCRIPTION, path: "" }),
};
export const revalidate = 60;

const GALLERY_IMAGES = [
  { src: "/images/facility-1.jpg", fits: /cardio|aerobic|hiit|circuit|cross|condition|rope|dance|zumba/i },
  { src: "/images/facility-2.jpg", fits: /box|kick|mma|fight|combat|martial/i },
  { src: "/images/facility-3.jpg", fits: /strength|weight|lift|power|body|muscle|calisthen|gym|full|floor/i },
];
function pickImages(titles: string[]): string[] {
  const free = [...GALLERY_IMAGES];
  const chosen = titles.map((t) => {
    const i = free.findIndex((img) => img.fits.test(t));
    return i === -1 ? null : free.splice(i, 1)[0].src;
  });
  return chosen.map((c) => c ?? free.shift()?.src ?? GALLERY_IMAGES[0].src);
}
const FALLBACK_OFFER = [
  { title: "Strength training", detail: "Free weights, racks and machines for every level" },
  { title: "Cardio", detail: "Treadmills, bikes and conditioning, every day" },
  { title: "Group classes", detail: "Coached sessions through the week" },
];

export default async function Home() {
  const { plans, classes } = await getCatalog();
  const fromServices = groupPlans(plans)
    .filter((g) => !isCatchAllCategory(g.category))
    .sort((a, b) => b.plans.length - a.plans.length)
    .slice(0, 3)
    .map((g) => ({
      title: titleCase(g.category),
      detail: `${g.plans.length} plan${g.plans.length === 1 ? "" : "s"} · from ${formatPrice(Math.min(...g.plans.map((p) => p.price)), CURRENCY)}`,
    }));
  const taken = new Set(fromServices.map((o) => o.title.toLowerCase()));
  const offer = [...fromServices, ...FALLBACK_OFFER.filter((o) => !taken.has(o.title.toLowerCase()))].slice(0, 3);
  const galleryImages = pickImages(offer.map((g) => g.title));
  const plansByPrice = [...plans].sort((a, b) => a.price - b.price);

  return (
    <div className="v2 min-h-screen">
      <SmoothScroll />
      <SiteNav />
      <main>
        <section className="home-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero.jpg" alt={`Training at ${SITE_NAME}`} className="absolute inset-0 h-full w-full object-cover object-[60%_center]" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-black/20" />
          <div className="hero-content frame grid gap-12 px-5 md:px-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h1 className="hero-heading animate-fade-in-up">Get stronger.<br />Feel <span className="text-lime">at home.</span></h1>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/75">Strength, cardio and a community that keeps you coming back. Find your rhythm at Liger, right here in Haile Garment.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/services" className="cta cta-lg cta-white">Explore membership</Link>
                <Link href="/register" className="cta cta-lg cta-ghost">Join Liger</Link>
              </div>
            </div>
            <ul className="hero-facts lg:col-span-4" aria-label="Training at Liger">
              <li className="hero-facts-hours"><span className="hero-status-dot" aria-hidden="true" />Open 7 days a week</li>
              <li>All levels welcome</li>
              <li className="hero-facts-location">{BUSINESS_AREA}</li>
            </ul>
          </div>
        </section>

        <section className="frame grid items-center gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal className="about-collage" as="figure">
            <div className="about-collage-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/story.jpg" alt="Strength training with free weights at Liger" loading="lazy" />
            </div>
            <div className="about-collage-top">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/facility-1.jpg" alt="Cardio and conditioning at Liger" loading="lazy" />
            </div>
            <div className="about-collage-bottom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/facility-4.jpg" alt="A closer look at the Liger training space" loading="lazy" />
            </div>
            <figcaption className="sr-only">Strength, conditioning and space to make progress at Liger Gym.</figcaption>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="eyebrow eyebrow-dark">Discover Liger</p>
            <h2 className="section-title mt-5">Good training.<br />Even better company.</h2>
            <p className="section-copy mt-6">{SITE_NAME} is a community-focused gym in {BUSINESS_AREA}, built for people who want to get stronger and stay consistent. From your first session to your heaviest lift, everything here is set up around steady progress.</p>
            <p className="section-copy mt-4">Build strength. Build habits. Build community.</p>
            <Link href="/about" className="cta cta-dark mt-8">Get to know Liger</Link>
          </ScrollReveal>
        </section>

        <section id="programs" className="bg-cloud">
          <div className="frame px-5 py-20 md:px-10 md:py-24">
            <ScrollReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div><p className="eyebrow eyebrow-dark">Find your kind of training</p><h2 className="section-title mt-4">Everything you need.<br />All in one place.</h2></div>
              <p className="section-copy max-w-sm">Everything you need to train, under one roof. Pick what suits you, or mix and match.</p>
            </ScrollReveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {offer.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 90}>
                  <Link href="/services" className="service-card !bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={galleryImages[i]} alt={`${item.title} at Liger Gym`} loading="lazy" />
                    <div className="service-card-body"><div className="flex items-center justify-between gap-3"><h3>{item.title}</h3><span className="round-arrow" aria-hidden="true"><PublicIcon name="arrow_up_right" className="arrow-icon" /></span></div><p>{item.detail}</p></div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="liger-feeling bg-night text-white" aria-labelledby="liger-feeling-title">
          <div className="frame grid gap-10 px-5 py-20 md:px-10 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-20">
            <ScrollReveal>
              <p className="eyebrow">The Liger feeling</p>
              <h2 id="liger-feeling-title" className="section-title mt-5">More than a place<br />to train.</h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">A space to focus. People who support you. Everything in place to keep you moving forward.</p>
              <div className="feeling-photo mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/facility-2.jpg" alt="Training with purpose at Liger Gym" loading="lazy" />
                <span className="feeling-photo-label">Your progress belongs here.</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100} className="feeling-principles">
              {VALUES.map((value, i) => (
                <div key={value.title} className="feeling-principle">
                  <span className="feeling-icon"><PublicIcon name={value.icon} /></span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{value.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">{value.body}</p>
                  </div>
                  <span className="feeling-number" aria-hidden="true">0{i + 1}</span>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>
        {classes.length > 0 && (
          <section id="classes" className="bg-night-2 text-white">
            <ScrollReveal className="frame grid gap-12 px-5 py-20 md:px-10 md:py-24 lg:grid-cols-[1fr_1.5fr]">
              <div><p className="eyebrow">Make time for you</p><h2 className="section-title mt-5">Pick a day.<br />Find your class.</h2><p className="mt-6 max-w-sm text-white/60">The weekly schedule, straight from our front desk. A little structure for a stronger week.</p></div>
              <div className="min-w-0"><ClassTimetable classes={classes} tone="dark" /></div>
            </ScrollReveal>
          </section>
        )}

        <section className="py-20 md:py-28">
          <ScrollReveal className="frame px-5 text-center md:px-10"><p className="eyebrow eyebrow-dark">Your next chapter starts here</p><h2 className="section-title mt-4">Simple plans. Steady progress.</h2><p className="section-copy mx-auto mt-5 max-w-lg">Pick a plan, register online, and pay at the front desk. We’ll help you find the right fit.</p></ScrollReveal>
          {plansByPrice.length > 0 ? <ScrollReveal delay={100} className="mt-12"><PlanCarousel plans={plansByPrice} /></ScrollReveal> : <div className="frame mt-10 px-5 text-center md:px-10"><p className="section-copy">Call us for current membership options.</p><a href={`tel:${PHONE_E164}`} className="cta cta-dark mt-5">{PHONE_DISPLAY}</a></div>}
          <div className="mt-8 text-center"><Link href="/services" className="text-sm font-medium text-lime-deep underline-offset-4 hover:underline">Explore all memberships <PublicIcon name="arrow_up_right" className="arrow-icon" /></Link></div>
        </section>

        <section className="bg-cloud">
          <ScrollReveal className="frame grid gap-12 px-5 py-20 md:grid-cols-2 md:px-10 md:py-24">
            <div><p className="eyebrow eyebrow-dark">Visit Liger Gym</p><h2 className="section-title mt-5">Come for a look.<br />Stay for the feeling.</h2><dl className="mt-8 space-y-5"><div><dt className="text-xs font-semibold uppercase tracking-wider text-lime-deep">Visit us</dt><dd className="mt-1">{BUSINESS_LOCATION_LINE}, {BUSINESS_CITY}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-wider text-lime-deep">Opening hours</dt><dd className="mt-1">{OPENING_HOURS.map((h) => <span key={h.days} className="block">{h.days}, {h.hours}</span>)}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-wider text-lime-deep">Give us a call</dt><dd><a href={`tel:${PHONE_E164}`} className="hover:underline">{PHONE_DISPLAY}</a></dd></div></dl><a href={GOOGLE_MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="cta cta-dark mt-8">Get directions</a></div>
            <div className="overflow-hidden rounded-[2rem] bg-white"><iframe src={GOOGLE_MAPS_EMBED_URL} className="h-80 w-full border-0 md:h-full md:min-h-[30rem]" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title={`${SITE_NAME} on Google Maps`} /></div>
          </ScrollReveal>
        </section>

        <section className="frame grid gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-24"><ScrollReveal className="md:col-span-4"><p className="eyebrow eyebrow-dark">Before you drop in</p><h2 className="section-title mt-4">Good to know.</h2><Link href="/faq" className="cta cta-dark mt-7">All your questions</Link></ScrollReveal><ScrollReveal className="md:col-span-8"><FaqList items={servicesFaq} /></ScrollReveal></section>
        <JoinCta />
      </main>
      <SiteFooter />
      <SchemaComponent schema={breadcrumbSchema([{ name: "Home", url: SITE_BASE_URL }])} />
    </div>
  );
}
