import type { Metadata } from "next";
import { PageHeading, ContactSection } from "@/components/shared";
import { Showreel, FilmGrid } from "@/components/films";
export const metadata: Metadata = {
  title: "Videography",
  description:
    "Videography, video production and visual editing by Ajmal Aboobaker in Abu Dhabi and Kerala.",
  alternates: { canonical: "/films" },
  openGraph: { title: "Videography | Ajmal Aboobaker", url: "/films" },
};
export default function Films() {
  return (
    <>
      <div className="page-shell">
        <PageHeading
          label="02 / MOVING STORIES"
          title="Videography"
          subtitle="Event coverage, corporate videos and stories in motion — captured and edited with care."
        />
        <Showreel standalone />
        <div className="section-heading film-heading">
          <h2>
            Videography projects<span className="accent">.</span>
          </h2>
          <span className="eyebrow">EVENTS · CORPORATE · COMMERCIAL</span>
        </div>
        <FilmGrid />
      </div>
      <ContactSection />
    </>
  );
}
