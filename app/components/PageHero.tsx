import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, intro, children, image = "/images/page-hero.jpg" }: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  image?: string;
}) {
  return (
    <section className="public-page-hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-night/80 to-night/50" />
      <div className="frame relative px-5 pt-40 pb-16 md:px-10 md:pt-48 md:pb-20">
        <p className="eyebrow animate-fade-in">{eyebrow}</p>
        <div className="mt-6 grid gap-8 md:grid-cols-12 md:items-end">
          <h1 className="animate-fade-in-up text-5xl leading-[1.04] font-bold tracking-[-0.045em] sm:text-6xl md:col-span-8 lg:text-7xl">{title}</h1>
          {intro && <p className="max-w-md text-base leading-relaxed text-white/75 md:col-span-4 md:pb-2">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
