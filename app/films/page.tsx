import type { Metadata } from "next";
import { PageHeading, ContactSection } from "@/components/shared";
import { Showreel, FilmGrid } from "@/components/films";
export const metadata: Metadata = {
  title: "Films",
  description:
    "Filmmaking, videography and visual editing by Ajmal Aboobaker in Abu Dhabi and Kerala.",
  alternates: { canonical: "/films" },
  openGraph: { title: "Films | Ajmal Aboobaker", url: "/films" },
};
export default function Films() {
  return (
    <>
      <div className="page-shell">
        <PageHeading
          label="02 / MOVING STORIES"
          title="Films"
          subtitle="Stories in motion."
        />
        <Showreel standalone />
        <div className="section-heading film-heading">
          <h2>
            Selected films<span className="accent">.</span>
          </h2>
          <span className="eyebrow">EVENTS & CORPORATE FILMS</span>
        </div>
        <FilmGrid />
      </div>
      <ContactSection />
    </>
  );
}
