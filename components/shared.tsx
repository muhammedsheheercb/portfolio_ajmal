import { ScrollText } from "@/components/scroll-text";
import { Instagram } from "./instagram-icon";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { experience, profile, projects } from "@/data/portfolio";
import { Reveal } from "./motion";
export function PageHeading({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="page-heading">
      <span className="eyebrow">{label}</span>
      <h1>
        {title}
        <span className="accent">.</span>
      </h1>
      <div className="page-heading-bottom">
        <p>{subtitle}</p>
        <span className="eyebrow">ABU DHABI / KERALA</span>
      </div>
    </div>
  );
}
export function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <Reveal>
        <div className="contact-top">
          <span className="eyebrow">
            A GOOD STORY STARTS WITH A CONVERSATION
          </span>
          <span className="eyebrow">LET’S TALK</span>
        </div>
        <Link href="/contact" className="contact-title">
          <ScrollText as="span">
            Let’s create
            <br />
            something <em>together.</em>
          </ScrollText>
          <ArrowUpRight strokeWidth={1} />
        </Link>
        <div className="contact-bottom">
          <p>
            Available for photography, filmmaking, editing,
            <br className="desktop-only" /> events and creative collaborations.
          </p>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>
              Email me <ArrowUpRight size={16} />
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp <ArrowUpRight size={16} />
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
export function InstagramSection() {
  return (
    <section className="instagram-section">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">FOLLOW THE JOURNEY</span>
          <a
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-handle"
          >
            @ajmal_aboobaker_ <ArrowUpRight size={22} />
          </a>
        </div>
        <Instagram size={22} />
      </div>
      <div className="instagram-grid">
        {[projects[1], projects[2], projects[5], projects[6]].map((p) => (
          <a
            key={p.id}
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Ajmal’s Instagram"
          >
            <Image
              src={p.thumbnail}
              alt={p.alt}
              fill
              sizes="(max-width: 650px) 50vw, 25vw"
            />
          </a>
        ))}
      </div>
      <p className="media-note">
        Follow Instagram for more photographs and moments behind the scenes.
      </p>
    </section>
  );
}
export function Experience() {
  return (
    <section className="experience">
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE YEARS THAT SHAPED THE EYE</span>
          <ScrollText>
            A journey in frames<span className="accent">.</span>
          </ScrollText>
        </div>
      </div>
      {experience.map((e, i) => (
        <Reveal key={e.company}>
          <div className="experience-row">
            <span className="experience-years">
              {e.years}
              <small>YEARS</small>
            </span>
            <div className="experience-place">
              <span className="eyebrow">
                0{i + 1} / {e.place}
              </span>
              <h3>{e.company}</h3>
            </div>
            <p>{e.description}</p>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Link className="footer-brand" href="/">
          AJMAL ABOOBAKER<span className="accent">.</span>
        </Link>
        <p>
          Photographer & Filmmaker
          <br />
          Abu Dhabi · Kerala
        </p>
        <a href="#top" className="back-top">
          BACK TO TOP <ArrowUp size={16} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Ajmal Aboobaker. All Rights Reserved.
        </span>
        <div>
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
