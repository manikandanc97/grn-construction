import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GRN Construction - Builders & Construction Company in Udumalpet",
    template: "%s | GRN Construction",
  },
  description:
    "GRN Construction - Trusted builders in Udumalpet, Tamil Nadu. Expert in residential & commercial construction, interior design, renovation, waterproofing & civil engineering. Rated 4.9 stars on Google.",
  keywords: [
    "construction company Udumalpet",
    "builders Tamil Nadu",
    "house construction Udumalpet",
    "interior design Udumalpet",
    "renovation services Coimbatore",
    "GRN Construction",
    "commercial construction",
    "waterproofing services",
    "civil engineering Udumalpet",
  ],
  authors: [{ name: "GRN Construction" }],
  creator: "GRN Construction",
  publisher: "GRN Construction",
  metadataBase: new URL("https://grnconstructions.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://grnconstructions.com",
    siteName: "GRN Construction",
    title: "GRN Construction - Premium Builders in Udumalpet, Tamil Nadu",
    description:
      "Trusted builders in Udumalpet with 10+ years of experience. House construction, interior design, renovation & waterproofing. 4.9-star rated, 41+ happy clients.",
    images: [
      {
        url: "/logo.jpg",
        width: 400,
        height: 400,
        alt: "GRN Construction Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GRN Construction - Builders in Udumalpet",
    description:
      "Professional construction company in Udumalpet, Tamil Nadu. 4.9-star Google Rating. Call: +91 93441 85614",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.jpg" },
      { url: "/logo.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/logo.jpg", sizes: "16x16", type: "image/jpeg" },
    ],
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1A6B7C",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "GeneralContractor"],
      "@id": "https://grnconstructions.com/#business",
      name: "GRN Construction",
      alternateName: "GRN Constructions",
      url: "https://grnconstructions.com",
      logo: {
        "@type": "ImageObject",
        url: "https://grnconstructions.com/logo.jpg",
        width: 400,
        height: 400,
      },
      image: "https://grnconstructions.com/logo.jpg",
      description:
        "GRN Construction is a trusted construction company in Udumalpet, Tamil Nadu offering house construction, commercial buildings, interior design, renovation, waterproofing and civil engineering services.",
      telephone: "+91-93441-85614",
      email: "info@grnconstructions.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Advocate, No.10 A, Vakil Nagarajan Street, near by Uma traders",
        addressLocality: "Udumalaipettai Municipality",
        addressRegion: "Tamil Nadu",
        postalCode: "642126",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "10.5892",
        longitude: "77.2496",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "41",
        bestRating: "5",
        worstRating: "1",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "09:00",
          closes: "17:00",
        },
      ],
      priceRange: "INR",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, Bank Transfer, UPI",
      areaServed: [
        "Udumalpet",
        "Tiruppur",
        "Coimbatore",
        "Pollachi",
        "Palani",
        "Tamil Nadu",
      ],
      serviceType: [
        "Building Construction",
        "House Construction",
        "Commercial Construction",
        "Interior Design",
        "Renovation",
        "Waterproofing",
        "Painting",
        "Civil Engineering",
        "Road Construction",
        "Roof Repair",
        "Tile Work",
        "Foundation Work",
      ],
      sameAs: [
        "https://www.facebook.com/grnconstruction",
        "https://www.instagram.com/grnconstruction",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="overflow-x-hidden bg-brand-light font-sans text-[15px] leading-[1.6] text-dark antialiased selection:bg-primary/20 selection:text-primary-dark"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
