import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://glidenetwork.com"),
  title: {
    default: "Glide Network - Your One Stop to All Services in Lagos",
    template: "%s | Glide Network",
  },
  description:
    "Fast, reliable transportation, market runs, and logistics services across Lagos, Nigeria. Book city rides, market shopping, errands, premium mobility, and event logistics.",
  keywords: [
    "Lagos transportation",
    "ride hailing Lagos",
    "market runs Nigeria",
    "grocery delivery Lagos",
    "errand services",
    "logistics Lagos",
    "premium rides",
    "event transportation",
    "Glide Network",
    "delivery service Nigeria",
  ],
  authors: [{ name: "Glide Network" }],
  creator: "Glide Network",
  publisher: "Glide Network",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://glidenetwork.com",
    siteName: "Glide Network",
    title: "Glide Network - Your One Stop to All Services",
    description: "Fast, reliable transportation, market runs, and logistics services across Lagos, Nigeria.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Glide Network - Transportation & Logistics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glide Network - Your One Stop to All Services",
    description: "Fast, reliable transportation, market runs, and logistics services across Lagos, Nigeria.",
    images: ["/og-image.png"],
    creator: "@glidenetwork",
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
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://glidenetwork.com",
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#001D3D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <head>
        <link rel="canonical" href="https://glidenetwork.com" />
        <meta name="geo.region" content="NG-LA" />
        <meta name="geo.placename" content="Lagos" />
        <meta name="geo.position" content="6.5244;3.3792" />
        <meta name="ICBM" content="6.5244, 3.3792" />
      </head>
      <body className="antialiased bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
