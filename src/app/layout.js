import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kavya Dry Cleaners Tagore Garden | Best Dry Cleaning in Delhi',
  description: 'Premium dry cleaning, laundry & steam pressing services in Tagore Garden, Delhi. 24-hour service, free pickup & delivery. Expert care for suits, sarees, wedding clothes. Call 9899320667',
  keywords: 'dry cleaners tagore garden, laundry service delhi, dry cleaning near me, steam press delhi, saree dry cleaning, suit dry cleaning, wedding clothes cleaning, tagore garden extension',
  authors: [{ name: 'Kavya Dry Cleaners' }],
  creator: 'Kavya Dry Cleaners',
  publisher: 'Kavya Dry Cleaners',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://kavyadrycleaners.shop'),
  alternates: {
    canonical: 'https://kavyadrycleaners.shop',
  },
  openGraph: {
    title: 'Kavya Dry Cleaners - Premium Dry Cleaning in Tagore Garden Delhi',
    description: '24-hour dry cleaning service in Tagore Garden. Expert care for all fabrics. Free pickup & delivery. Call 9899320667',
    url: 'https://kavyadrycleaners.shop',
    siteName: 'Kavya Dry Cleaners',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kavya Dry Cleaners - Premium Laundry Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kavya Dry Cleaners Tagore Garden | Best Dry Cleaning Delhi',
    description: '24-hour dry cleaning service. Expert fabric care. Free pickup. Call 9899320667',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code-here', // Add your Google Search Console verification code
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://kavyadrycleaners.shop",
              "name": "Kavya Dry Cleaners",
              "image": "https://kavyadrycleaners.shop/logo.jpg",
              "description": "Premium dry cleaning and laundry services in Tagore Garden, Delhi. 24-hour service with free pickup and delivery.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "D-313, Tagore Garden Extension",
                "addressLocality": "New Delhi",
                "addressRegion": "Delhi",
                "postalCode": "110027",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "28.6413",
                "longitude": "77.1122"
              },
              "url": "https://kavyadrycleaners.shop",
              "telephone": "+919899320667",
              "priceRange": "₹₹",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                  ],
                  "opens": "09:00",
                  "closes": "20:00"
                }
              ],
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "28.6413",
                  "longitude": "77.1122"
                },
                "geoRadius": "10000"
              },
              "sameAs": [
                "https://wa.me/919899320667"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Dry Cleaning Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Shirt Dry Cleaning",
                      "description": "Professional dry cleaning for shirts"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Suit Dry Cleaning",
                      "description": "Expert care for suits and formal wear"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Saree Dry Cleaning",
                      "description": "Gentle cleaning for delicate sarees"
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Additional Meta Tags */}
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.placename" content="Tagore Garden" />
        <meta name="geo.position" content="28.6413;77.1122" />
        <meta name="ICBM" content="28.6413, 77.1122" />
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-800`}>
        {children}
      </body>
    </html>
  )
}