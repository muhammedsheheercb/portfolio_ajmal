import type { Metadata } from "next";
import { PageHeading, ContactSection } from "@/components/shared";
import { Gallery } from "@/components/gallery";
export const metadata: Metadata = {
  title: "Photography",
  description:
    "Explore photography across people, places, sport and everyday moments. A portfolio by Abu Dhabi photographer Ajmal Aboobaker.",
  alternates: { canonical: "/photography" },
  openGraph: { title: "Photography | Ajmal Aboobaker", url: "/photography" },
};
export default function Photography() {
  return (
    <>
      <div className="page-shell">
        <PageHeading
          label="01 / STILL STORIES"
          title="Photography"
          subtitle="People. Places. Movement. Moments."
        />
        <Gallery />
      </div>
      <ContactSection />
    </>
  );
}
