"use client";
import { Instagram } from "./instagram-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { usePreferences } from "./providers";
import { useModalFocus } from "./use-modal-focus";
const links = [
  ["Home", "/"],
  ["Work", "/work"],
  ["Photography", "/photography"],
  ["Films", "/films"],
  ["About", "/about"],
  ["Contact", "/contact"],
];
export function Navigation() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState(false);
  const { theme, accent, toggleTheme, setAccent } = usePreferences();
  const menu = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  useModalFocus(open, menu, () => setOpen(false));
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 30);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);
  useEffect(() => {
    if (!palette) return;
    const close = (e: MouseEvent) => {
      if (!paletteRef.current?.contains(e.target as Node)) setPalette(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPalette(false);
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", key);
    };
  }, [palette]);
  return (
    <>
      <header className={`nav ${path === "/" && !scrolled ? "nav-hero" : ""}`}>
        <Link className="wordmark" href="/" aria-label="Ajmal Aboobaker home">
          AJMAL
          <br />
          ABOOBAKER<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([name, href]) => (
            <Link
              href={href}
              key={href}
              className={path === href ? "active" : ""}
              aria-current={path === href ? "page" : undefined}
            >
              {name}
            </Link>
          ))}
        </nav>
        <div className="nav-controls">
          <a
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ajmal on Instagram"
            className="icon-button instagram-nav"
          >
            <Instagram size={17} />
          </a>
          <span className="nav-divider" />
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <span suppressHydrationWarning>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </span>
          </button>
          <div className="palette-wrap" ref={paletteRef}>
            <button
              className="icon-button accent-toggle"
              aria-label="Choose accent color"
              aria-expanded={palette}
              onClick={() => setPalette(!palette)}
            >
              <span className="accent-dot" />
            </button>
            {palette && (
              <div className="palette">
                <p>Accent</p>
                {(["neutral", "gold", "earth", "green"] as const).map(
                  (color) => (
                    <button
                      key={color}
                      onClick={() => setAccent(color)}
                      aria-pressed={accent === color}
                    >
                      <i className={`swatch ${color}`} />
                      {
                        {
                          neutral: "Neutral",
                          gold: "Warm gold",
                          earth: "Earth",
                          green: "Muted green",
                        }[color]
                      }
                      {accent === color && <span>✓</span>}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
          <button
            className="icon-button mobile-toggle"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={23} />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menu}
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mobile-menu-top">
              <span className="eyebrow">AJMAL ABOOBAKER</span>
              <button
                className="icon-button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {links.map(([name, href], i) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={path === href ? "page" : undefined}
                >
                  <span>0{i + 1}</span>
                  {name}
                </Link>
              ))}
            </nav>
            <div className="mobile-menu-bottom">
              <p>Abu Dhabi · Kerala</p>
              <a href={`mailto:${profile.email}`}>Let’s talk</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
