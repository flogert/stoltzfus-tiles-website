import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import TileCanvas from "./components/TileCanvas";
import ScrollProgressTiles from "./components/ScrollProgressTiles";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ── SEO & Open-Graph metadata ── */
const siteUrl = "https://stoltzfustiles.com";
const title = "Stoltzfus Tiles | Professional Tile Installation in Lancaster County, PA";
const description =
  "Stoltzfus Tiles is Lancaster County's trusted tile expert specializing in bathroom remodeling, kitchen backsplashes, flooring, and custom tilework. Free estimates — call today!";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Stoltzfus Tiles",
  },
  icons: {
    icon: "/stoltzfus.png",
    shortcut: "/stoltzfus.png",
    apple: "/stoltzfus.png",
  },
  description,
  keywords: [
    "tile installer Lancaster PA",
    "bathroom tile remodel",
    "kitchen tile backsplash",
    "tile subcontractor Lancaster County",
    "bathroom remodeling Lancaster PA",
    "tile flooring installation",
    "custom tilework Pennsylvania",
    "Stoltzfus Tiles",
  ],
  authors: [{ name: "Stoltzfus Tiles" }],
  creator: "Stoltzfus Tiles",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Stoltzfus Tiles",
    title,
    description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Stoltzfus Tiles – Expert Tile Installation in Lancaster County",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* JSON-LD structured data for local business */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Stoltzfus Tiles",
    description,
    url: siteUrl,
    telephone: "+1-717-555-0142",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lancaster",
      addressRegion: "PA",
      postalCode: "17601",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 40.0379, longitude: -76.3055 },
      geoRadius: "50000",
    },
    sameAs: [],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <TileCanvas />
        <ScrollProgressTiles />
        {children}
      </body>
    </html>
  );
}
