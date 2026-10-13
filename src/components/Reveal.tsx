"use client";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll-triggered reveal. Content is fully visible without JavaScript or with reduced motion;
 * the hidden start-state only exists under `html.js-motion` (see globals.css).
 */
export default function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: "up" | "mask" | "fade";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.setAttribute("data-in", "");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} data-reveal={variant} style={{ "--d": `${delay}ms` } as React.CSSProperties} className={className}>
      {children}
    </Tag>
  );
}
