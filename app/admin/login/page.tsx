"use client";

import { useState, type FormEvent } from "react";
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
    <main className="v2 sign-in-screen">
      <div className="sign-in-panel">
        <div className="sign-in-form">
          <Link href="/" className="sign-in-logo" aria-label={`${SITE_NAME} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-wordmark.png" alt={SITE_NAME} width={100} height={36} className="h-8 w-auto object-contain" />
          </Link>
          <h1 className="mt-9 text-4xl font-semibold tracking-[-.04em] md:text-5xl">Sign in</h1>
          <p className="mt-3 text-sm text-night/55">Welcome back. Sign in to manage {SITE_NAME}.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" aria-label="Sign in" aria-busy={isSubmitting}>
            {error && <div className="rounded-[.85rem] border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</div>}
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Email address</span>
              <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" placeholder="you@example.com" className="field" disabled={isSubmitting} />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Password</span>
              <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" placeholder="Enter your password" minLength={6} className="field" disabled={isSubmitting} />
            </label>
            <button type="submit" disabled={isSubmitting} className="cta cta-lg w-full justify-between disabled:cursor-not-allowed disabled:opacity-50">
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
