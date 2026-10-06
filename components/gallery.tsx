"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { categories, projects, type Project } from "@/data/portfolio";
import { useModalFocus } from "./use-modal-focus";
export function Gallery({ featured = false }: { featured?: boolean }) {
  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState<number | null>(null);
  const modal = useRef<HTMLDivElement>(null);
  const start = useRef(0);
  const reduced = useReducedMotion();
  const items = (
    featured ? projects.filter((p) => p.featured) : projects
  ).filter((p) => category === "All" || p.category === category);
  const change = (direction: number) =>
    setIndex((i) =>
      i === null ? null : (i + direction + items.length) % items.length,
    );
  useModalFocus(index !== null, modal, () => setIndex(null));
  useEffect(() => {
    if (index === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        change(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        change(-1);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [index, items.length]);
  return (
    <>
      {!featured && (
        <div className="filters" role="group" aria-label="Filter photographs">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={c === category}
              className={c === category ? "selected" : ""}
              onClick={() => {
                setCategory(c);
                setIndex(null);
              }}
            >
              {c}
              <span>
                {c === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === c).length}
              </span>
            </button>
          ))}
        </div>
      )}
      <div className={featured ? "editorial-grid" : "photo-grid"}>
        <AnimatePresence mode="popLayout">
          {items.map((p, i) => (
            <motion.figure
              key={p.id}
              className={`photo ${p.orientation}`}
              layout={!reduced}
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <button
                className="photo-button"
                data-cursor="VIEW"
                onClick={() => setIndex(i)}
                aria-label={`View ${p.title}, ${p.category}${p.placeholder ? ", stock sample" : ""}`}
                style={{ aspectRatio: p.aspectRatio }}
              >
                <Image
                  src={p.thumbnail}
                  alt={p.alt}
                  fill
                  sizes={
                    featured
                      ? "(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 80vw"
                      : "(max-width: 650px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  }
                />
                <span className="photo-hover">
                  <ArrowUpRight size={22} />
                  <span>View photograph</span>
                </span>
              </button>
              <figcaption>
                <div>
                  <h3>{p.title}</h3>
                  <span>{p.category}</span>
                </div>
                {p.placeholder && (
                  <span className="sample-label">Stock sample</span>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>
      {items.length === 0 && (
        <p className="gallery-empty" role="status">
          No photographs in this category yet. Explore the full collection under
          All.
        </p>
      )}
      <AnimatePresence>
        {index !== null && items[index] && (
          <motion.div
            ref={modal}
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${items[index].title} photograph`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="viewer-top">
              <span className="eyebrow">PHOTOGRAPHY / AJMAL ABOOBAKER</span>
              <button
                aria-label="Close photograph"
                className="icon-button"
                onClick={() => setIndex(null)}
              >
                <X />
              </button>
            </div>
            <div
              className="lightbox-image"
              onTouchStart={(e) => {
                start.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                const diff = start.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) change(diff > 0 ? 1 : -1);
              }}
            >
              <Image
                key={items[index].id}
                src={items[index].media}
                alt={items[index].alt}
                fill
                sizes="95vw"
                priority
              />
            </div>
            <div className="viewer-bottom">
              <div>
                <h3>{items[index].title}</h3>
                <p>
                  {items[index].category}
                  {items[index].placeholder ? " · Stock sample" : ""}
                </p>
              </div>
              <div className="viewer-controls">
                <button
                  className="icon-button"
                  aria-label="Previous photograph"
                  onClick={() => change(-1)}
                >
                  <ChevronLeft />
                </button>
                <span aria-live="polite">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </span>
                <button
                  className="icon-button"
                  aria-label="Next photograph"
                  onClick={() => change(1)}
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
