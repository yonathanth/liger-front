import type { FaqItem } from "@/lib/faq-content";

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((f) => (
        <details key={f.id} className="faq-item group">
          <summary className="flex cursor-pointer list-none items-center gap-5 py-5 [&::-webkit-details-marker]:hidden">
            <span className="flex-1 text-base font-semibold tracking-tight md:text-lg">{f.question}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-night transition-transform group-open:rotate-45 group-open:bg-lime">
              <span aria-hidden="true" className="text-xl leading-none">+</span>
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-sm leading-relaxed text-night/65">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
