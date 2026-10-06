import { ScrollText } from "@/components/scroll-text";
import type { Metadata } from "next";
import Image from "next/image";
import { PageHeading, Experience, ContactSection } from "@/components/shared";
import { media } from "@/data/portfolio";
export const metadata: Metadata = {
  title: "About Ajmal",
  description:
    "Meet Ajmal Aboobaker, a photographer, filmmaker and visual editor with 11+ years of experience in Abu Dhabi and Kerala.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Ajmal | Ajmal Aboobaker", url: "/about" },
};
export default function About() {
  return (
    <>
      <div className="page-shell">
        <PageHeading
          label="THE PERSON BEHIND THE PICTURE"
          title="About Ajmal"
          subtitle="A life shaped by light, movement and curiosity."
        />
        <section className="about-main">
          <div className="about-portrait">
            <Image
              src={media.about}
              alt="Ajmal Aboobaker, photographer and filmmaker"
              fill
              priority
              sizes="(max-width: 700px) 100vw, 45vw"
            />
          </div>
          <div className="biography">
            <span className="eyebrow">
              AJMAL ABOOBAKER / PHOTOGRAPHER & FILMMAKER
            </span>
            <ScrollText>
              11+ years
              <br />
              <em>behind the lens.</em>
            </ScrollText>
            <p>
              I’m a photographer, filmmaker and visual editor based in Abu
              Dhabi, with more than eleven years of professional experience
              across the UAE and India.
            </p>
            <p>
              For six years, I’ve worked in Abu Dhabi’s creative industry,
              including with Bigframe Film Photography Company. My practice
              spans photography and videography, with three editing specialties:
              video editing, photo editing and sports editing. I edit both
              sports videos and sports photographs, bringing attention to
              movement, timing and the key moments of each event.
            </p>
            <p>
              My journey began in Kerala: two years at Alpha Studio, followed by
              three years working independently as a photographer and
              videographer. Those early projects taught me to adapt, pay
              attention and find the story in every setting.
            </p>
            <div className="regional-stats">
              <div>
                <span>06</span>
                <p>YEARS / ABU DHABI</p>
              </div>
              <div>
                <span>05</span>
                <p>YEARS / KERALA</p>
              </div>
            </div>
          </div>
        </section>
        <Experience />
        <section className="behind-lens">
          <span className="eyebrow">BEHIND THE LENS</span>
          <ScrollText>
            Good images begin
            <br />
            with <em>paying attention.</em>
          </ScrollText>
          <div>
            <p>
              I’m drawn to authentic moments — the way light falls, a quiet
              expression, the rhythm of a place. Composition and timing matter,
              but so does knowing when to step back and let a story unfold.
            </p>
            <p>
              Whether I’m capturing a single photograph or shaping a complete
              film, I aim for visuals that feel natural, intentional and
              memorable. Working across India and the UAE has taught me to bring
              a versatile, dependable approach to every project.
            </p>
          </div>
        </section>
      </div>
      <ContactSection />
    </>
  );
}
