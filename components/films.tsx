"use client";
import { ScrollText } from "@/components/scroll-text";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { films, media } from "@/data/portfolio";
import { useModalFocus } from "./use-modal-focus";
type VideoSource = { title: string; src: string; poster: string };
function VideoModal({
  video,
  close,
}: {
  video: VideoSource | null;
  close: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  useModalFocus(!!video, ref, close);
  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="video-modal"
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={`${video.title} video player`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="viewer-top">
            <span className="eyebrow">{video.title}</span>
            <button
              className="icon-button"
              onClick={close}
              aria-label="Close video"
            >
              <X />
            </button>
          </div>
          <div className="video-stage">
            {error ? (
              <div className="video-error">
                <p>The film could not be loaded.</p>
                <button className="text-link" onClick={() => setError(false)}>
                  Try again
                </button>
              </div>
            ) : (
              <video
                src={video.src}
                poster={video.poster}
                controls
                autoPlay
                playsInline
                preload="metadata"
                onError={() => setError(true)}
              >
                Your browser does not support video playback.
              </video>
            )}
          </div>
          <div className="viewer-bottom">
            <span>Photography · Films · Editing</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export function Showreel({ standalone = false }: { standalone?: boolean }) {
  const [video, setVideo] = useState<VideoSource | null>(null);
  return (
    <section className={`showreel ${standalone ? "standalone" : ""}`}>
      <div className="section-heading">
        <div>
          <span className="eyebrow">STORIES IN MOTION</span>
          <ScrollText>
            Showreel<span className="accent">.</span>
          </ScrollText>
        </div>
        <span className="small-copy">Light. Movement. Emotion.</span>
      </div>
      <button
        className="reel-preview"
        data-cursor="PLAY"
        onClick={() =>
          setVideo({
            title: media.showreelTitle,
            src: media.showreel,
            poster: media.showreelPoster,
          })
        }
        aria-label="Play showreel"
      >
        <Image
          src={media.showreelPoster}
          alt={`${media.showreelTitle} — featured film preview`}
          fill
          sizes="100vw"
        />
        <span className="reel-shade" />
        <span className="play-circle">
          <Play fill="currentColor" size={22} />
        </span>
        <span className="reel-caption">
          <span>{media.showreelTitle.toUpperCase()}</span>
          <span>PLAY SHOWREEL</span>
        </span>
      </button>
      <p className="media-note">Featured film · {media.showreelTitle}.</p>
      <VideoModal
        key={video?.src || "closed"}
        video={video}
        close={() => setVideo(null)}
      />
    </section>
  );
}
export function FilmGrid() {
  const [video, setVideo] = useState<VideoSource | null>(null);
  return (
    <>
      <div className="film-grid">
        {films.map((film, i) => (
          <article className="film" key={film.id}>
            <button
              className="film-preview"
              data-cursor="PLAY"
              onClick={() =>
                setVideo({
                  title: film.title,
                  src: film.videoUrl,
                  poster: film.thumbnail,
                })
              }
              aria-label={`Play ${film.title}`}
            >
              <Image
                src={film.thumbnail}
                alt={`${film.title} — film preview`}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <span className="play-circle">
                <Play size={18} fill="currentColor" />
              </span>
              <span className="film-number">
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>
            <div className="film-caption">
              <h3>{film.title}</h3>
              <span>
                {film.category}
                {film.year ? ` · ${film.year}` : ""}
              </span>
            </div>
          </article>
        ))}
      </div>
      <VideoModal
        key={video?.title || "closed"}
        video={video}
        close={() => setVideo(null)}
      />
    </>
  );
}
