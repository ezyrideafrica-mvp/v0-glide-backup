import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Glide Network - Professional Services Platform",
    template: "%s | Glide Network",
  },
  description:
    "Your trusted platform for professional services. Connect with reliable service providers for market runs, cleaning, home repairs, and more.",
  keywords: ["services", "market runs", "delivery", "professional services", "Lagos", "Nigeria"],
  authors: [{ name: "Glide Network" }],
  creator: "Glide Network",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://glidenetwork.com",
    siteName: "Glide Network",
    title: "Glide Network - Professional Services Platform",
    description: "Your trusted platform for professional services. Connect with reliable service providers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glide Network - Professional Services Platform",
    description: "Your trusted platform for professional services.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
