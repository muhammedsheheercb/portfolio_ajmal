import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/navigation";
import { Cursor } from "@/components/cursor";
import { Footer } from "@/components/shared";
import { profile } from "@/data/portfolio";
import "./globals.css";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const description =
  "Professional photographer, videographer and visual editor based in Abu Dhabi, UAE, with over 11 years of experience across the UAE and Kerala, India.";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ajmal Aboobaker | Photographer & Filmmaker in Abu Dhabi",
    template: "%s | Ajmal Aboobaker",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ajmal Aboobaker",
    title: "Ajmal Aboobaker | Photographer & Filmmaker in Abu Dhabi",
    description,
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "Ajmal Aboobaker | Photographer & Filmmaker",
    description,
  },
  icons: { icon: "/icon.svg" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#171917" },
    { media: "(prefers-color-scheme: light)", color: "#f2f0e9" },
  ],
};
const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var a=localStorage.getItem('accent');document.documentElement.dataset.accent=['neutral','gold','earth','green'].includes(a)?a:'gold';}catch(e){document.documentElement.dataset.theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Photographer & Filmmaker",
    url: siteUrl,
    email: profile.email,
    telephone: profile.phone,
    sameAs: [profile.instagram],
    homeLocation: { "@type": "Place", name: "Abu Dhabi, UAE" },
    knowsAbout: [
      "Photography",
      "Videography",
      "Video Editing",
      "Photo Editing",
      "Sports Photography",
    ],
  };
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Providers>
          <Navigation />
          <main id="main">{children}</main>
          <Footer />
          <Cursor />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
