import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SmoothScroll } from '@/components/providers/smooth-scroll';
import { CursorFollower } from '@/components/ui/cursor-follower';
import { site } from '@/content/site';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap'
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.name} — Software Engineer, AI Engineer, Entrepreneur`,
    template: `%s — ${site.name}`
  },
  description: site.tagline,
  keywords: [
    'Software Engineer',
    'AI Engineer',
    'Quantitative Finance',
    'Full-Stack Developer',
    'Catalyst Labs',
    'Mithun V K'
  ],
  authors: [{ name: site.name, url: site.siteUrl }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.siteUrl,
    siteName: site.name,
    title: `${site.name} — Software Engineer, AI Engineer, Entrepreneur`,
    description: site.tagline,
    images: [{ url: '/assets/images/profile.jpg', width: 1200, height: 1200, alt: site.name }]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Software Engineer, AI Engineer, Entrepreneur`,
    description: site.tagline,
    images: ['/assets/images/profile.jpg']
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.siteUrl,
  email: `mailto:${site.email}`,
  jobTitle: 'Software Engineer',
  worksFor: { '@type': 'Organization', name: 'Catalyst Labs' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Anna University Chennai' },
  sameAs: site.socials.filter(s => s.href.startsWith('https')).map(s => s.href)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <CursorFollower />
      </body>
    </html>
  );
}
