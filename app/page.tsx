import { ScrollText } from "@/components/scroll-text";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { HeroVideo } from "@/components/hero-video";
import { HeroTitle, Reveal } from "@/components/motion";
import { Gallery } from "@/components/gallery";
import { Showreel } from "@/components/films";
import { ContactSection, InstagramSection } from "@/components/shared";
import { media, services } from "@/data/portfolio";
export default function Home() {
  return (
    <>
      <section className="hero hero-minimal">
        <HeroVideo />
        <div className="hero-content">
          <HeroTitle />
          <div className="hero-description">
            <span className="eyebrow">PHOTOGRAPHER & VIDEOGRAPHER</span>
          </div>
          <p className="hero-summary">
            Capturing people, places and moments — based in Abu Dhabi, with
            roots in Kerala.
          </p>
          <div className="hero-actions">
            <Link href="/work" className="hero-work-link">
              EXPLORE THE WORK <ArrowUpRight size={17} />
            </Link>
            <Link href="/about" className="hero-work-link hero-about-link">
              ABOUT ME <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="intro section-pad" id="intro">
        <Reveal>
          <div className="intro-grid">
            <span className="eyebrow">THE ART OF SEEING</span>
            <div>
              <ScrollText>
                Visual stories
                <br />
                shaped by <em>experience.</em>
              </ScrollText>
              <div className="intro-copy">
                <ScrollText as="p">
                  I’m Ajmal, a photographer and filmmaker based in Abu Dhabi.
                  For over eleven years, I’ve been finding stories in people,
                  places and the moments in between.
                </ScrollText>
                <Link href="/about" className="text-link">
                  ABOUT AJMAL <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="intro-foot">
          <span>11+ YEARS BEHIND THE LENS</span>
          <span>TWO PLACES. ONE PERSPECTIVE.</span>
        </div>
      </section>
      <section className="selected-section section-pad" id="work">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A FEW FRAMES, A WORLD OF STORIES</span>
            <ScrollText>
              Selected work<span className="accent">.</span>
            </ScrollText>
          </div>
          <Link href="/photography" className="text-link">
            ALL PHOTOGRAPHY <ArrowUpRight size={17} />
          </Link>
        </div>
        <Gallery featured />
      </section>
      <div className="section-pad reel-section">
        <Showreel />
      </div>
      <section className="services-section section-pad">
        <Reveal>
          <div className="services-layout">
            <div className="services-intro">
              <span className="eyebrow">WHAT I DO</span>
              <ScrollText>
                From the first
                <br />
                frame to the
                <br />
                <em>final cut.</em>
              </ScrollText>
              <p>
                Photography and videography, from capture to edit.
                <br />
                Specialising in video editing, photo editing and sports editing.
              </p>
            </div>
            <div className="service-list">
              {services.map((s, i) => (
                <Link
                  key={s}
                  href={`/contact?service=${encodeURIComponent(s === "Commercial Content" ? "Commercial Project" : s === "Event Coverage" ? "Other" : s)}`}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s}</h3>
                  <ArrowUpRight size={23} strokeWidth={1} />
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
      <section className="home-about section-pad">
        <div className="home-about-image">
          <Image
            src={media.about}
            alt="Ajmal Aboobaker wearing headphones during an evening shoot"
            fill
            sizes="(max-width: 700px) 100vw, 45vw"
          />
        </div>
        <div className="home-about-copy">
          <span className="eyebrow">BEHIND THE LENS</span>
          <ScrollText>
            Present in the moment.
            <br />
            <em>Intentional in every frame.</em>
          </ScrollText>
          <ScrollText as="p">
            From Kerala’s familiar landscapes to the energy of Abu Dhabi, every
            place has shaped the way I see. My work is rooted in authentic
            moments, natural light and a sense of story.
          </ScrollText>
          <Link className="text-link" href="/about">
            MEET AJMAL <ArrowUpRight size={17} />
          </Link>
          <div className="about-stat">
            <span>
              11<sup>+</sup>
            </span>
            <p>
              YEARS OF
              <br />
              SEEING DIFFERENTLY
            </p>
          </div>
        </div>
      </section>
      <InstagramSection />
      <ContactSection />
    </>
  );
}
