import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeading, ContactSection } from "@/components/shared";
import { Gallery } from "@/components/gallery";
import { FilmGrid } from "@/components/films";
export const metadata: Metadata = {
  title: "Selected work",
  alternates: { canonical: "/work" },
  openGraph: { title: "Selected work | Ajmal Aboobaker", url: "/work" },
};
export default function Work() {
  return (
    <>
      <div className="page-shell">
        <PageHeading
          label="A COLLECTION OF PERSPECTIVES"
          title="Selected work"
          subtitle="Still frames. Moving stories. One creative eye."
        />
        <div className="work-tabs">
          <a href="#photographs">Photography</a>
          <a href="#motion">Films</a>
        </div>
        <section id="photographs">
          <div className="section-heading">
            <h2>Photography</h2>
            <Link href="/photography" className="text-link">
              EXPLORE GALLERY <ArrowUpRight size={17} />
            </Link>
          </div>
          <Gallery featured />
        </section>
        <section id="motion" className="work-films">
          <div className="section-heading">
            <h2>Films</h2>
            <Link href="/films" className="text-link">
              EXPLORE FILMS <ArrowUpRight size={17} />
            </Link>
          </div>
          <FilmGrid />
        </section>
      </div>
      <ContactSection />
    </>
  );
}
