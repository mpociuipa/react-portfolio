import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import '../index.css';
import Analytics from '../components/Analytics';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://react-portfolio-steel-ten.vercel.app'),
  title: 'Mantas Počiuipa | Full Stack Developer | Games & AI Projects',
  description:
    'Mantas Počiuipa - Full Stack Developer creating React applications, AI projects, desktop software, Android apps and 3D games.',
  verification: {
    google: 'bCiA5vyqrUPEV2f4v4ciUxPtrBS6oRASQ8vpFc3pAlo',
  },
  openGraph: {
    type: 'website',
    images: ['/preview.png'],
    siteName: 'Mantas Počiuipa',
  },
  twitter: {
    card: 'summary_large_image',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#4db5ff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <div id="root">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}