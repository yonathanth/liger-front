import Link from "next/link";
import type { Metadata } from "next";
import { shareMeta } from "@/lib/seo";
import { SiteNav } from "./components/SiteNav";
import { SmoothScroll } from "./components/SmoothScroll";
import { SiteFooter } from "./components/SiteFooter";
import { JoinCta } from "./components/JoinCta";
import { ClassTimetable } from "./components/ClassTimetable";
import { PlanCarousel } from "./components/PlanCarousel";
import { SchemaComponent } from "@/lib/schema-component";
import { breadcrumbSchema } from "@/lib/schemas";
import { formatPrice, getCatalog, groupPlans, isCatchAllCategory, titleCase } from "@/lib/catalog";
import {
  BUSINESS_AREA,
  BUSINESS_CITY,
  BUSINESS_LOCATION_LINE,
  CURRENCY,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_EMBED_URL,
  OPENING_HOURS,
  PHONE_DISPLAY,
  PHONE_E164,
  SITE_BASE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SHORT_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Gym in ${BUSINESS_AREA}`,
  description: SITE_DESCRIPTION,
  ...shareMeta({
    title: `${SITE_NAME} | Gym in ${BUSINESS_AREA}`,
    description: SITE_DESCRIPTION,
    path: "",
  }),
};

// Refresh the synced classes and prices at most once a minute.
export const revalidate = 60;

/** Gallery photos with the kinds of service each one suits, so a card gets a fitting photo. */
const GALLERY_IMAGES = [
  { src: "/images/facility-1.jpg", fits: /cardio|aerobic|hiit|circuit|cross|condition|rope|dance|zumba/i },
  { src: "/images/facility-2.jpg", fits: /box|kick|mma|fight|combat|martial/i },
  { src: "/images/facility-3.jpg", fits: /strength|weight|lift|power|body|muscle|calisthen|gym|full|floor/i },
];

/** One photo per card: the best fit first, then whatever is left, never the same photo twice. */
function pickImages(titles: string[]): string[] {
  const free = [...GALLERY_IMAGES];
  const chosen: (string | null)[] = titles.map((t) => {
    const i = free.findIndex((img) => img.fits.test(t));
    return i === -1 ? null : free.splice(i, 1)[0].src;
  });
  return chosen.map((c) => c ?? free.shift()?.src ?? GALLERY_IMAGES[0].src);
}

/** Small round photos beside the facts in the about section. */
const AVATAR_IMAGES = ["/images/facility-2.jpg", "/images/facility-3.jpg", "/images/facility-1.jpg", "/images/facility-4.jpg"];

/** General services, used to fill the gallery when there are fewer than three synced ones. */
const FALLBACK_OFFER = [
  { title: "Strength training", detail: "Free weights, racks and machines for every level" },
  { title: "Cardio", detail: "Treadmills, bikes and conditioning, every day" },
  { title: "Group classes", detail: "Coached sessions through the week" },
];

export default async function Home() {
  const { plans, classes } = await getCatalog();

  // Always three service cards: the gym's own membership categories (from the desktop
  // app) first, then general services to fill the rest.
  const fromServices = groupPlans(plans)
    .filter((g) => !isCatchAllCategory(g.category))
    .sort((a, b) => b.plans.length - a.plans.length)
    .slice(0, 3)
    .map((g) => {
      const cheapest = Math.min(...g.plans.map((p) => p.price));
      return {
        title: titleCase(g.category),
        detail: `${g.plans.length} plan${g.plans.length === 1 ? "" : "s"} · from ${formatPrice(cheapest, CURRENCY)}`,
      };
    });
  const taken = new Set(fromServices.map((o) => o.title.toLowerCase()));
  const offer = [...fromServices, ...FALLBACK_OFFER.filter((o) => !taken.has(o.title.toLowerCase()))].slice(0, 3);
  // Middle card is the large one, so put the leading item there.
  const gallery = [offer[1], offer[0], offer[2]].filter(Boolean);
  const galleryImages = pickImages(gallery.map((g) => g.title));

  const plansByPrice = [...plans].sort((a, b) => a.price - b.price);

  return (
    <div className="v2 min-h-screen">
      <SmoothScroll />
      <SiteNav />

      {/* Hero */}
      <section className="p-2 md:p-3">
        <div className="relative flex h-[calc(100svh-1rem)] min-h-[36rem] max-h-[58rem] flex-col overflow-hidden rounded-[1.25rem] bg-night text-white md:h-[calc(100svh-1.5rem)] md:rounded-[1.5rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero.jpg" alt={`Training at ${SITE_NAME}`} className="photo absolute inset-0 h-full w-full object-cover" />
          {/* Lime light leak, the way the reference uses its red. */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-screen"
            style={{
              background:
                "radial-gradient(40% 45% at 22% 38%, rgba(180,195,28,0.22), transparent 70%), radial-gradient(30% 35% at 85% 20%, rgba(180,195,28,0.10), transparent 70%)",
            }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-night/40" />

          {/* Taglines across the middle */}
          <div className="relative flex flex-1 items-center justify-between px-5 pt-24 md:px-10">
            <p className="mono hidden text-white/80 md:block">Build strength</p>
            <p className="mono text-white/80">Build habits</p>
            <p className="mono hidden text-white/80 md:block">Build community</p>
          </div>

          <div className="relative px-5 pb-6 md:px-10 md:pb-10">
            <div className="grid gap-8 border-t border-white/20 pt-8 md:grid-cols-12 md:items-end">
              <h1 className="text-[2.9rem] leading-[1.02] font-light tracking-[-0.03em] sm:text-6xl md:col-span-7 lg:text-[5.5rem]">
                Get stronger
                <br />
                with {SITE_SHORT_NAME}
              </h1>
              <div className="md:col-span-5 md:justify-self-end">
                <p className="mono max-w-sm !text-[0.8rem] text-white/85">
                  Strength, cardio and classes.
                  <br />
                  Open every day in Haile Garment.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-2 sm:flex sm:gap-3">
                  <Link
                    href="/services"
                    className="cta cta-lg justify-center gap-2 px-2.5 text-[0.88rem] whitespace-nowrap sm:gap-3 shadow-[0_10px_30px_-10px_rgba(180,195,28,0.6)] sm:px-[1.6rem] sm:text-[1.02rem]"
                  >
                    See membership
                  </Link>
                  <Link
                    href="/register"
                    className="cta cta-lg cta-ghost justify-center gap-2 px-2.5 text-[0.88rem] whitespace-nowrap sm:gap-3 sm:px-[1.6rem] sm:text-[1.02rem]"
                  >
                    Join now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        className="relative"
        style={{
          backgroundImage: "radial-gradient(rgba(14,14,14,0.09) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        <div className="frame grid gap-8 px-5 pt-24 pb-12 md:grid-cols-12 md:px-10 md:pt-32 md:pb-16">
          <p className="mono text-lime-deep md:col-span-4">About {SITE_NAME}</p>
          <div className="md:col-span-8">
            <p className="text-2xl leading-[1.35] font-light tracking-tight md:text-[2.15rem] md:leading-[1.3]">
              <span className="inline-block w-10 md:w-24" aria-hidden />
              {SITE_NAME} is a community-focused gym in {BUSINESS_AREA}, built for people who want to get stronger
              and stay consistent. From your first session to your heaviest lift, everything here is set up
              around steady progress.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {AVATAR_IMAGES.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt="" className="photo h-9 w-9 rounded-full border-2 border-mist object-cover" />
                ))}
              </div>
              <p className="mono text-night/60">
                Open 7 days a week{classes.length > 0 ? ` · ${classes.length} classes weekly` : ""}
              </p>
            </div>
            <Link href="/about" className="cta mt-10">
              About {SITE_NAME}
            </Link>
          </div>
        </div>
      </section>

      {/* What we offer: services gallery */}
      <section id="programs" className="frame px-5 pt-12 pb-24 md:px-10 md:pt-16 md:pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl leading-[1.1] font-light tracking-tight md:text-5xl">
            Our services
          </h2>
          <p className="mono mx-auto mt-5 max-w-md text-night/55">
            Everything you need to train, under one roof. Pick what suits you, or mix and match.
          </p>
        </div>

        <div className="mt-14 grid gap-3 md:grid-cols-[1fr_2fr_1fr]">
          {gallery.map((item, i) => {
            const big = i === 1;
            return (
              <article
                key={item.title}
                className={`group relative h-[22rem] overflow-hidden rounded-[1.25rem] bg-night text-white md:h-[30rem] ${
                  big ? "order-first md:order-none" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={galleryImages[i]}
                  alt=""
                  className={`photo absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                    big ? "object-[50%_20%]" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3 className={`font-light tracking-tight ${big ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                    {item.title}
                  </h3>
                  <p className="mono mt-2 max-w-[18rem] text-white/70">{item.detail}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Timetable */}
      {classes.length > 0 && (
        <section id="classes" className="bg-night-2 text-white">
          <div className="frame px-5 py-24 md:px-10 md:py-32">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mono text-lime">Timetable</p>
              <h2 className="mt-4 text-4xl leading-[1.1] font-light tracking-tight md:text-5xl">
                Pick a day, find a class
              </h2>
              <p className="mono mx-auto mt-5 max-w-md text-white/50">
                The weekly schedule, straight from our front desk.
              </p>
            </div>
            <div className="mx-auto mt-14 max-w-4xl">
              <ClassTimetable classes={classes} tone="dark" />
            </div>
          </div>
        </section>
      )}

      {/* Membership */}
      {plansByPrice.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="frame px-5 md:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mono text-lime-deep">Membership</p>
              <h2 className="mt-4 text-4xl leading-[1.1] font-light tracking-tight md:text-5xl">
                Simple pricing
              </h2>
              <p className="mono mx-auto mt-5 max-w-md text-night/55">
                Pick a plan, register online, and pay at the front desk.
              </p>
            </div>
          </div>
          <div className="mt-14">
            <PlanCarousel plans={plansByPrice} />
          </div>
          <div className="mt-6 text-center">
            <Link href="/services" className="mono text-night/60 underline-offset-4 hover:text-night hover:underline">
              All plans →
            </Link>
          </div>
        </section>
      )}

      {/* Visit */}
      <section className="bg-night text-white">
        <div className="frame grid gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <div className="md:col-span-5">
            <p className="mono text-lime">Visit us</p>
            <h2 className="mt-4 text-4xl leading-[1.1] font-light tracking-tight md:text-5xl">
              Drop in for a look around
            </h2>
            <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
              <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                <dt className="mono text-white/45">Address</dt>
                <dd>
                  {BUSINESS_LOCATION_LINE}, {BUSINESS_CITY}
                </dd>
              </div>
              <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                <dt className="mono text-white/45">Hours</dt>
                <dd>
                  {OPENING_HOURS.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}, {h.hours}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                <dt className="mono text-white/45">Phone</dt>
                <dd>
                  <a href={`tel:${PHONE_E164}`} className="hover:text-lime">
                    {PHONE_DISPLAY}
                  </a>
                </dd>
              </div>
            </dl>
            <a href={GOOGLE_MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="cta mt-8">
              Get directions
            </a>
          </div>
          <div className="overflow-hidden rounded-[1.25rem] md:col-span-7">
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              className="h-80 w-full border-0 md:h-full md:min-h-[28rem]"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title={`${SITE_NAME} on Google Maps`}
            />
          </div>
        </div>
      </section>

      <JoinCta />

      <SiteFooter />

      <SchemaComponent schema={breadcrumbSchema([{ name: "Home", url: SITE_BASE_URL }])} />
    </div>
  );
}
