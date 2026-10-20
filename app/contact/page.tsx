import Link from "next/link";
import { SiteNav } from "../components/SiteNav";
import { SmoothScroll } from "../components/SmoothScroll";
import { SiteFooter } from "../components/SiteFooter";
import { PageHero } from "../components/PageHero";
import {
  BUSINESS_CITY,
  BUSINESS_LOCATION_LINE,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_EMBED_URL,
  OPENING_HOURS,
  PHONE_DISPLAY,
  PHONE_E164,
  SITE_NAME,
  SOCIAL_LINKS,
} from "@/lib/site";

export default function ContactPage() {
  return (
    <div className="v2 min-h-screen">
      <SmoothScroll />
      <SiteNav />

      <main>
        <PageHero
          eyebrow="Contact"
          title={
            <>
              Come say
              <br />
              hello
            </>
          }
          intro={`Questions about membership, classes or a first visit? The ${SITE_NAME} team is a call away.`}
        />

        <section className="frame grid gap-3 px-5 pt-4 pb-24 md:px-10 md:pb-32 lg:grid-cols-12">
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {/* Phone */}
            <a
              href={`tel:${PHONE_E164}`}
              className="group flex flex-col rounded-[1.25rem] bg-night p-7 text-white transition-colors hover:bg-night-3"
            >
              <p className="mono text-lime">Call us</p>
              <p className="mt-8 text-3xl font-light tracking-tight md:text-4xl">{PHONE_DISPLAY}</p>
              <p className="mono mt-2 text-white/45">Every day, during opening hours</p>
            </a>

            {/* Location */}
            <div className="flex flex-col rounded-[1.25rem] bg-cloud p-7">
              <p className="mono text-lime-deep">Find us</p>
              <p className="mt-8 text-2xl leading-snug font-light tracking-tight">
                {BUSINESS_LOCATION_LINE}, {BUSINESS_CITY}
              </p>
              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta cta-dark mt-6 self-start"
              >
                Get directions
              </a>
            </div>

            {/* Hours */}
            <div className="flex flex-col rounded-[1.25rem] bg-cloud p-7">
              <p className="mono text-lime-deep">Opening hours</p>
              <dl className="mt-6 divide-y divide-night/10">
                {OPENING_HOURS.map((h) => (
                  <div key={h.days} className="flex items-baseline justify-between gap-4 py-2">
                    <dt className="mono text-night/55">{h.days}</dt>
                    <dd className="text-xl font-light">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Social */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="flex flex-col rounded-[1.25rem] bg-cloud p-7">
                <p className="mono text-lime-deep">Follow along</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="cta cta-dark">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="min-h-[24rem] overflow-hidden rounded-[1.25rem] bg-night lg:col-span-7">
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              className="h-full min-h-[24rem] w-full border-0 lg:min-h-[40rem]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title={`${SITE_NAME}, ${BUSINESS_LOCATION_LINE}, on Google Maps`}
            />
          </div>
        </section>

        {/* Bottom strip */}
        <section className="frame px-5 pb-24 md:px-10 md:pb-32">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[1.25rem] bg-night p-8 text-white md:flex-row md:items-center md:p-10">
            <div>
              <p className="mono text-lime">Ready to start?</p>
              <p className="mt-3 text-3xl font-light tracking-tight">Register online and we’ll call you back.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/register" className="cta cta-lg">
                Register
              </Link>
              <Link href="/faq" className="cta cta-lg cta-ghost">
                Read the FAQ
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
