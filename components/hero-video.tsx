"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { media } from "@/data/portfolio";
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setEnabled(!mq.matches);
      if (mq.matches) {
        ref.current?.pause();
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const video = ref.current;
    if (!enabled || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
        } else {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    const visibility = () => {
      if (document.hidden) video.pause();
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [enabled]);
  return (
    <>
      <Image
        src={media.heroPoster}
        alt="Accenture 2023 event highlights"
        fill
        priority
        sizes="100vw"
        className="hero-background"
      />
      {enabled && !failed && (
        <video
          ref={ref}
          className="hero-background hero-video"
          src={media.hero}
          poster={media.heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onError={() => setFailed(true)}
        />
      )}
      <div className="hero-shade" />
    </>
  );
}
