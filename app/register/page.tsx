"use client";

import { PublicIcon } from "../components/PublicIcon";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { potentialCustomersApi } from "@/lib/api";
import { formatPeriod, formatPrice, getCatalog, type CatalogPlan } from "@/lib/catalog";
import { CURRENCY, SITE_NAME } from "@/lib/site";
import { SiteNav } from "../components/SiteNav";
import { SmoothScroll } from "../components/SmoothScroll";
import { SiteFooter } from "../components/SiteFooter";

function planLabel(p: CatalogPlan) {
  return `${p.name} · ${formatPeriod(p.periodDays)} · ${formatPrice(p.price, CURRENCY)}`;
}

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    serviceId: "",
    age: "",
    height: "",
    telegramUsername: "",
    remark: "",
    objective: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [plans, setPlans] = useState<CatalogPlan[]>([]);
  // Bots fill every field; people never see this one.
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    let cancelled = false;
    getCatalog().then(({ plans }) => {
      if (cancelled) return;
      setPlans(plans);
      const wanted = searchParams.get("plan");
      if (wanted && plans.some((p) => String(p.id) === wanted)) {
        setFormData((prev) => ({ ...prev, serviceId: wanted }));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (honeypot) {
      setSuccess(true);
      setLoading(false);
      return;
    }

    const plan = plans.find((p) => String(p.id) === formData.serviceId);

    try {
      await potentialCustomersApi.register({
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim() || undefined,
        serviceId: plan ? plan.id : undefined,
        notes: plan ? `Plan chosen on website: ${planLabel(plan)}` : "Signed up on the website (no plan chosen)",
        age: formData.age ? Number(formData.age) : undefined,
        height: formData.height || undefined,
        telegramUsername: formData.telegramUsername || undefined,
        remark: formData.remark || undefined,
        objective: formData.objective || undefined,
      });

      setSuccess(true);
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        serviceId: "",
        age: "",
        height: "",
        telegramUsername: "",
        remark: "",
        objective: "",
      });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const selected = plans.find((p) => String(p.id) === formData.serviceId);
  const categories = [...new Set(plans.map((p) => p.category))];

  return (
    <div className="v2 min-h-screen">
      <SmoothScroll />
      <SiteNav />

      <main className="registration-main">
        <div className="registration-grid grid lg:grid-cols-12">
          {/* What happens next */}
          <aside className="registration-aside relative overflow-hidden rounded-[1.25rem] text-night md:rounded-[1.5rem] lg:col-span-5">
            <div aria-hidden className="absolute -top-20 -right-20 hidden h-64 w-64 rounded-full border-[28px] border-night/8 lg:block" />
            <div className="relative flex h-full flex-col p-5 md:p-8 lg:p-10">
              <p className="mono text-night/65">Join {SITE_NAME}</p>
              <h1 className="mt-3 text-[1.85rem] leading-[1.08] font-semibold tracking-[-0.03em] lg:mt-5 lg:text-6xl">
                Let’s get you <br className="hidden lg:block" />
                started
              </h1>
              <p className="mono mt-3 max-w-sm !text-[0.75rem] text-night/70 lg:mt-5 lg:!text-[0.8rem]">
                Leave your details and we’ll be in touch. No payment online.
              </p>
              {/* Phones: the steps in one line, so the form is right below. */}
              <p className="mono mt-3 !text-[0.7rem] text-night/55 lg:hidden">Register · We call you · Come in and train</p>

              <ol className="mt-12 hidden border-t border-night/15 lg:mt-auto lg:block">
                {[
                  { t: "Register here", d: "Takes about a minute." },
                  { t: "We call you", d: "To answer questions and confirm your plan." },
                  { t: "Come in and train", d: "Pay at the front desk and you’re in." },
                ].map((step, i) => (
                  <li key={step.t} className="flex items-baseline gap-5 border-b border-night/15 py-5">
                    <span className="mono text-night/50">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-xl font-semibold">{step.t}</p>
                      <p className="mono mt-1 text-night/60">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {selected && (
                <div className="mt-4 rounded-[1rem] bg-night p-4 text-white lg:mt-6 lg:p-5">
                  <p className="mono text-white/50">Your plan</p>
                  <p className="mt-2 text-lg font-semibold">{selected.name}</p>
                  <p className="mt-1 text-3xl font-semibold text-lime">{formatPrice(selected.price, CURRENCY)}</p>
                  <p className="mono mt-1 text-white/50">for {formatPeriod(selected.periodDays)}</p>
                </div>
              )}
            </div>
          </aside>

          {/* Form */}
          <section className="registration-form rounded-[1.25rem] p-6 md:rounded-[1.5rem] md:p-10 lg:col-span-7">
            <p className="mono text-lime-deep">Your details</p>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mono mb-2 block text-night/60">Full name</span>
                  <input
                    className="field"
                    placeholder="e.g. Abebe Bikila"
                    type="text"
                    name="fullName"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label className="block">
                  <span className="mono mb-2 block text-night/60">Phone number</span>
                  <input
                    className="field"
                    placeholder="09 1234 5678"
                    type="tel"
                    name="phoneNumber"
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="mono mb-2 block text-night/60">
                  Membership plan <span className="text-night/35">(optional)</span>
                </span>
                <select className="field cursor-pointer" name="serviceId" value={formData.serviceId} onChange={handleInputChange}>
                  <option value="">Not sure yet, help me choose</option>
                  {categories.map((category) => (
                    <optgroup key={category} label={category}>
                      {plans
                        .filter((p) => p.category === category)
                        .map((p) => (
                          <option key={p.id} value={String(p.id)}>
                            {planLabel(p)}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mono mb-2 block text-night/60">
                  Main goal <span className="text-night/35">(optional)</span>
                </span>
                <select className="field cursor-pointer" name="objective" value={formData.objective} onChange={handleInputChange}>
                  <option value="">Select a goal</option>
                  <option value="Weight Loss">Weight loss</option>
                  <option value="Muscle Gain">Muscle gain</option>
                  <option value="Weight Gain">Weight gain</option>
                  <option value="Endurance">Endurance</option>
                  <option value="Speed">Speed</option>
                  <option value="Strength / Power">Strength / power</option>
                  <option value="Cardiovascular Development (Strengthening heart & breathing capacity)">
                    Heart & breathing fitness
                  </option>
                  <option value="Others">Something else</option>
                </select>
              </label>

              <details className="group rounded-[0.9rem] border border-night/12">
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 [&::-webkit-details-marker]:hidden">
                  <span className="mono text-night/70">
                    More about you <span className="text-night/35">(optional)</span>
                  </span>
                  <PublicIcon name="expand_more" className="transition-transform group-open:rotate-180" />
                </summary>
                <div className="grid gap-5 border-t border-night/12 p-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mono mb-2 block text-night/60">Email</span>
                    <input className="field" placeholder="name@example.com" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleInputChange} />
                  </label>
                  <label className="block">
                    <span className="mono mb-2 block text-night/60">Telegram</span>
                    <input className="field" placeholder="@username" type="text" name="telegramUsername" value={formData.telegramUsername} onChange={handleInputChange} />
                  </label>
                  <label className="block">
                    <span className="mono mb-2 block text-night/60">Age</span>
                    <input className="field" placeholder="e.g. 25" type="number" min={1} max={120} name="age" value={formData.age} onChange={handleInputChange} />
                  </label>
                  <label className="block">
                    <span className="mono mb-2 block text-night/60">Height</span>
                    <input className="field" placeholder="e.g. 175 cm" type="text" name="height" value={formData.height} onChange={handleInputChange} />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mono mb-2 block text-night/60">Anything we should know?</span>
                    <textarea className="field min-h-24" placeholder="Injuries, preferred times, questions…" name="remark" value={formData.remark} onChange={handleInputChange} rows={3} />
                  </label>
                </div>
              </details>

              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="hidden"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />

              {error && (
                <div className="rounded-[0.9rem] border border-red-300 bg-red-50 p-4 text-sm text-red-700" role="alert">
                  {error}
                </div>
              )}

              <button className="cta cta-lg w-full justify-center disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={loading}>
                {loading ? "Sending…" : "Register"}
              </button>
              <p className="mono text-center text-night/45">We only use your details to contact you about joining.</p>
            </form>
          </section>
        </div>
      </main>

      <div className="mt-2 md:mt-3">
        <SiteFooter />
      </div>

      {success && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-night/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-[1.5rem] bg-white p-8 text-center text-night shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime">
              <PublicIcon name="check" />
            </div>
            <p className="mono mt-6 text-lime-deep">Registered</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">You’re on the list</h2>
            <p className="mono mt-3 text-night/55">We’ll call you soon. Welcome to {SITE_NAME}.</p>
            <button type="button" onClick={() => router.push("/")} className="cta cta-lg cta-dark mt-8 w-full justify-center">
              Back to home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={<div className="v2 mono min-h-screen px-6 py-40 text-center text-night/50">Loading…</div>}
    >
      <RegisterContent />
    </Suspense>
  );
}
