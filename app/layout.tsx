import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Open_Sans } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Sushi Time | Poké y Sushi Delivery Buenos Aires | Pedí Online",
  description:
    "🍣 Sushi Time - El mejor sushi y poké de Buenos Aires. Delivery rápido, ingredientes frescos, técnicas japonesas tradicionales. Pedí online en másDelivery ¡Ya!",
  keywords: "sushi time, poke buenos aires, sushi delivery, comida japonesa, sashimi, rolls, nigiri, masdelivery, sushipoke time, delivery zona norte, sushi fresco",
  authors: [{ name: "Sushi Time" }],
  creator: "Sushi Time",
  publisher: "Sushi Time",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sushipoke-time.com.ar'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Sushi Time | Mejor Poké y Sushi Delivery Buenos Aires",
    description: "🍣 El mejor sushi y poké de Buenos Aires. Delivery rápido, ingredientes frescos. Pedí online en másDelivery",
    url: "https://sushipoke-time.com.ar",
    siteName: "Sushi Time",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/images/sushi-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Sushi Time - El mejor sushi y poké de Buenos Aires",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sushi Time | Mejor Poké y Sushi Delivery Buenos Aires",
    description: "🍣 El mejor sushi y poké de Buenos Aires. Delivery rápido, ingredientes frescos. Pedí online",
    images: ["/images/sushi-hero.jpg"],
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <head>
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Sushi Time",
              "alternateName": "Sushi Time Buenos Aires",
              "description": "El mejor sushi y poké delivery de Buenos Aires. Ingredientes frescos, técnicas japonesas tradicionales.",
              "url": "https://sushipoke-time.com.ar",
              "telephone": "+54-11-XXXX-XXXX",
              "priceRange": "$$",
              "servesCuisine": ["Japanese", "Sushi", "Poke"],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Buenos Aires",
                "addressCountry": "AR",
                "addressRegion": "CABA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -34.6037,
                "longitude": -58.3816
              },
              "openingHours": "Mo-Su 18:00-00:00",
              "hasMenu": "https://pedidos.masdelivery.com/sushi-time",
              "orderURL": "https://pedidos.masdelivery.com/sushi-time",
              "image": [
                "https://sushipoke-time.com.ar/images/sushi-hero.jpg",
                "https://sushipoke-time.com.ar/images/logo.png"
              ],
              "sameAs": [
                "https://www.instagram.com/sushitimebsas/",
                "https://pedidos.masdelivery.com/sushi-time"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              },
              "paymentAccepted": "Cash, Credit Card, Debit Card",
              "currenciesAccepted": "ARS",
              "serviceType": "Delivery",
              "areaServed": {
                "@type": "City",
                "name": "Buenos Aires"
              }
            })
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
