import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import ScrollProgressTiles from "./components/ScrollProgressTiles";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

/* ── SEO & Open-Graph metadata ── */
const siteUrl = "https://stoltzfuscustomtiles.com";
const title = "Stoltzfus Custom Tile | Professional Tile Installation in Lancaster County, PA";
const description =
  "Stoltzfus Custom Tile is Lancaster County's trusted tile expert specializing in bathroom remodeling, kitchen backsplashes, flooring, and custom tilework. Free estimates — call today!";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Stoltzfus Custom Tile",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
    "Stoltzfus Custom Tile",
  ],
  authors: [{ name: "Stoltzfus Custom Tile" }],
  creator: "Stoltzfus Custom Tile",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Stoltzfus Custom Tile",
    title,
    description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Stoltzfus Custom Tile – Expert Tile Installation in Lancaster County",
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
    name: "Stoltzfus Custom Tile",
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
        className={`${outfit.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollProgressTiles />
        {children}
      </body>
    </html>
  );
}
