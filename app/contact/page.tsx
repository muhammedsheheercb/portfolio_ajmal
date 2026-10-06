import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeading } from "@/components/shared";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/data/portfolio";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ajmal Aboobaker for photography, videography, editing, events and creative collaborations in Abu Dhabi and Kerala.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Ajmal Aboobaker", url: "/contact" },
};
export default function Contact() {
  return (
    <div className="page-shell contact-page">
      <PageHeading
        label="LET’S MAKE SOMETHING MEMORABLE"
        title="Let’s create"
        subtitle="Photography. Video production. Your next story."
      />
      <div className="contact-layout">
        <div className="contact-details">
          <h2>
            Something
            <br />
            <em>together.</em>
          </h2>
          <p>
            Available for photography, videography, editing, commercial
            productions, events and creative collaborations.
          </p>
          <div className="contact-detail">
            <span className="eyebrow">SAY HELLO</span>
            <a href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight size={18} />
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              {profile.phone}
            </a>
          </div>
          <div className="contact-detail">
            <span className="eyebrow">BASED IN</span>
            <p>Abu Dhabi, UAE / Kerala, India</p>
          </div>
          <div className="contact-detail">
            <span className="eyebrow">FIND ME ELSEWHERE</span>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp <ArrowUpRight size={18} />
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              @ajmal_aboobaker_ <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
