import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { SITE_NAME, SITE_URL } from '@/constants/site';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#100f10',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} – Discover Movies, TV Shows & Trending Trailers`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Starlight helps you discover new and popular movies and TV shows. Explore trending titles, watch trailers, and find your next favorite movies or series.',

  keywords: [
    'movies',
    'tv shows',
    'movie discovery',
    'trending movies',
    'watch trailers',
    'film recommendations',
    'series recommendations',
    'latest movies',
    'popular tv shows',
  ],

  applicationName: SITE_NAME,
  authors: [{ name: 'Starlight Team' }],
  creator: SITE_NAME,

  alternates: { canonical: '/' },

  openGraph: {
    title: `${SITE_NAME} – Discover Movies & TV Shows`,
    description:
      'Find trending movies and TV shows, watch trailers, and explore your next favorite entertainment.',
    url: '/',
    siteName: SITE_NAME,
    locale: 'en_GB',
    type: 'website',
    // Image is supplied automatically by src/app/opengraph-image.jpg
  },

  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} – Discover Movies & TV Shows`,
    description:
      'Find trending movies and TV shows, watch trailers, and explore your next favorite entertainment.',
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-secondary flex min-h-dvh w-full flex-col text-white antialiased">
        <a
          href="#main-content"
          className="bg-primary sr-only z-[100] rounded-md px-6 py-3 text-[16px] font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
