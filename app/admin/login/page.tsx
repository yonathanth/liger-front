"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="v2 flex min-h-screen p-2 md:p-3">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[1.25rem] bg-night px-4 py-16 md:rounded-[1.5rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero.jpg" alt="" className="photo absolute inset-0 h-full w-full object-cover opacity-40" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/50" />

        <div className="relative w-full max-w-md">
          <Link href="/" className="mb-6 flex justify-center" aria-label={`${SITE_NAME} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-wordmark.png" alt={SITE_NAME} width={111} height={40} className="h-10 w-auto object-contain" />
          </Link>

          <div className="rounded-[1.25rem] bg-white p-7 md:p-10">
            <p className="mono text-lime-deep">Staff only</p>
            <h1 className="mt-3 text-4xl font-light tracking-tight">Sign in</h1>
            <p className="mono mt-2 text-night/55">Access the admin dashboard.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {error && (
                <div className="rounded-[0.9rem] border border-red-300 bg-red-50 p-4 text-sm text-red-700" role="alert">
                  {error}
                </div>
              )}

              <label className="block">
                <span className="mono mb-2 block text-night/60">Email address</span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                  placeholder="you@example.com"
                  className="field"
                />
              </label>

              <label className="block">
                <span className="mono mb-2 block text-night/60">Password</span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  minLength={6}
                  className="field"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cta cta-lg cta-dark w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>

          <div className="mt-6 flex justify-center">
            <Link href="/" className="mono text-white/60 hover:text-white">
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
