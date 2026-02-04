import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Nunito, Noto_Sans_Arabic } from 'next/font/google'
import { ServiceWorkerRegistration } from '@/components'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400'],
  variable: '--font-arabic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gulf Arabic Basics',
  description: 'Learn practical Gulf Arabic phrases - Yalla, let\'s learn!',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Yalla',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDF8F3' },
    { media: '(prefers-color-scheme: dark)', color: '#1F1A17' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${notoSansArabic.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <Script
          src="https://tally.so/widgets/embed.js"
          strategy="lazyOnload"
        />
      </head>
      <body className="font-sans bg-cream dark:bg-deep-brown text-charcoal dark:text-warm-white min-h-screen safe-area-inset">
        <GoogleAnalytics />
        {/* Skip link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-terracotta focus:text-white focus:rounded-button"
        >
          Skip to main content
        </a>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  )
}
