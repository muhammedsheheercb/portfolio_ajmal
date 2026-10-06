"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const goToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });

export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    // Selecting the current page again should also bring its beginning into view.
    const onClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = (event.target as Element)?.closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (!link || link.target === "_blank" || link.hasAttribute("download"))
        return;
      const url = new URL(link.href, location.href);
      if (
        url.origin === location.origin &&
        url.pathname === location.pathname &&
        url.search === location.search &&
        !url.hash
      )
        goToTop();
    };
    document.addEventListener("click", onClick);
    return () => {
      history.scrollRestoration = previous;
      document.removeEventListener("click", onClick);
    };
  }, []);

  useLayoutEffect(() => {
    // Explicit anchor links still lead to their requested section.
    if (location.hash) return;
    goToTop();
    const frame = requestAnimationFrame(goToTop);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
