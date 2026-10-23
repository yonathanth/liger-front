import Link from "next/link";
import { formatPeriod, formatPrice, titleCase, type CatalogPlan } from "@/lib/catalog";
import { CURRENCY } from "@/lib/site";

export function PlanCard({ plan, className = "" }: { plan: CatalogPlan; className?: string }) {
  const extras: string[] = [];
  if (plan.groupSize && plan.groupSize > 1) extras.push(`For ${plan.groupSize} people`);
  if (plan.maxUsageCount) extras.push(`${plan.maxUsageCount} visits included`);
  const benefits = [...(plan.benefits ?? []), ...extras];

  return (
    <article className={`plan-card group flex flex-col border p-6 transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="plan-category mono">{titleCase(plan.category)}</p>
        <p className="plan-period text-xs font-medium">{formatPeriod(plan.periodDays)}</p>
      </div>
      <h3 className="mt-8 text-2xl leading-tight font-semibold tracking-tight">{plan.name}</h3>
      <p className="mt-4 text-4xl font-semibold tracking-tight">{formatPrice(plan.price, CURRENCY)}</p>
      <p className="plan-description mt-2 text-xs">for {formatPeriod(plan.periodDays)} · pay at the gym</p>
      {benefits.length > 0 && <ul className="mt-6 space-y-3 border-t border-night/10 pt-6">{benefits.map((b) => <li key={b} className="plan-benefit flex items-start gap-2.5 text-sm"><span aria-hidden="true" className="text-lime-deep">✓</span>{b}</li>)}</ul>}
      {plan.description && <p className="plan-description mt-5 text-sm leading-relaxed">{plan.description}</p>}
      <div className="mt-auto pt-8"><Link href={`/register?plan=${plan.id}`} className="cta cta-dark w-full justify-between">Choose plan</Link></div>
    </article>
  );
}
