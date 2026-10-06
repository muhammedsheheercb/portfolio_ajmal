"use client";
import { useEffect, useRef } from "react";
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      !matchMedia("(hover: hover) and (pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const move = (e: PointerEvent) => {
      const node = ref.current;
      if (!node) return;
      node.style.left = `${e.clientX}px`;
      node.style.top = `${e.clientY}px`;
      const element = (e.target as HTMLElement)?.closest("[data-cursor]");
      const interactive = (e.target as HTMLElement)?.closest("a,button");
      node.dataset.mode = element ? "media" : interactive ? "link" : "idle";
      node.textContent = element?.getAttribute("data-cursor") || "";
      node.style.opacity = "1";
    };
    const hide = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
    };
  }, []);
  return <div ref={ref} className="custom-cursor" aria-hidden="true" />;
}
