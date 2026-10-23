import type { Metadata, Viewport } from "next";
import { shareMeta } from "@/lib/seo";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { MultipleSchemaComponent } from "@/lib/schema-component";
import { organizationSchema, localBusinessSchema } from "@/lib/schemas";
import { BUSINESS_AREA, SITE_BASE_URL, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Landing design: light grotesk for headlines and copy, mono for small labels.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_BASE_URL),
  title: {
    default: `${SITE_NAME} | Gym in ${BUSINESS_AREA}`,
    template: `%s`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    SITE_NAME,
    "Liger Gym Addis Ababa",
    "gym in Addis Ababa",
    "gym Haile Garment",
    "gym Meskelegna",
    "fitness center Addis Ababa",
    "bodybuilding Addis Ababa",
    "personal trainer Addis Ababa",
    "strength training Ethiopia",
    "gym membership prices Addis Ababa",
    "cross training Addis Ababa",
    "best gym in Haile Garment",
    "ligergymadddis.com",
    "ligergymaddis.com",
  ],
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
  category: "fitness",
  authors: [{ name: SITE_NAME }],
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  other: {
    "geo.region": "ET-AA",
    "geo.placename": "Addis Ababa",
    "geo.position": "8.93563;38.72272",
    "ICBM": "8.93563, 38.72272",
  },
  ...shareMeta({ title: `${SITE_NAME} | Built for strength, made for everyone`, description: SITE_DESCRIPTION }),
  alternates: {
    canonical: SITE_BASE_URL,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f4ee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Material Symbols Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <MultipleSchemaComponent
          schemas={[organizationSchema(), localBusinessSchema()]}
        />
      </head>
      <body
        className={`bg-background text-on-background overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
