import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Starlight – Discover Movies, TV Shows & Trending Trailers',
    template: '%s | Starlight',
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

  authors: [{ name: 'Starlight Team' }],
  creator: 'Starlight',

  openGraph: {
    title: 'Starlight – Discover Movies & TV Shows',
    description:
      'Find trending movies and TV shows, watch trailers, and explore your next favorite entertainment.',
    url: 'https://starlight-seven.vercel.app/',
    siteName: 'Starlight',
    images: [
      {
        url: 'https://starlight-seven.vercel.app/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Starlight Movies and TV Shows',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },

  metadataBase: new URL('https://starlight-seven.vercel.app'),

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
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen w-full flex-col bg-[#100f10] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
