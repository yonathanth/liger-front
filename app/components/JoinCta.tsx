import Link from "next/link";

export function JoinCta({ title = "Your first session starts here.", body = "A stronger routine. A welcoming community. A little more time for you." }: { title?: string; body?: string }) {
  return (
    <section className="bg-white px-5 pb-5 md:px-10 md:pb-10">
      <div className="frame relative overflow-hidden rounded-[2rem] bg-night text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/page-hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-night/80 to-night/40" />
        <div className="relative px-7 py-16 text-center md:px-16 md:py-24">
          <p className="eyebrow">Make room for yourself</p>
          <h2 className="section-title mx-auto mt-5 max-w-3xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-lg text-white/70">{body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/register" className="cta cta-lg cta-white">Join Liger</Link>
            <Link href="/faq" className="cta cta-lg cta-ghost">Read the FAQ</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
