"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "none";
  distance?: number;
  as?: ElementType;
  threshold?: number;
}

export function ScrollReveal({ children, className = "", delay = 0, duration = 600, direction = "up", distance = 18, as: Component = "div", threshold = 0.1 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    // Content starts visible, including when JavaScript is unavailable. Only animate
    // sections below the fold, keeping already-visible content stable on hydration.
    if (node.getBoundingClientRect().top < window.innerHeight) return;
    node.dataset.reveal = "pending";
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        node.dataset.reveal = "visible";
        observer.unobserve(node);
      }
    }, { threshold, rootMargin: "0px 0px -40px 0px" });
    observer.observe(node);
    return () => { observer.disconnect(); delete node.dataset.reveal; };
  }, [threshold]);

  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration}ms`,
    "--reveal-distance": direction === "up" ? `${distance}px` : "0px",
  } as CSSProperties;

  return <Component ref={ref} className={`scroll-reveal ${className}`} style={style}>{children}</Component>;
}
