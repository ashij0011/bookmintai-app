import '../styles/globals.css';

export const metadata = {
  title: 'BookMint AI — AI Coloring Book Generator',
  description:
    'Generate beautiful, printable coloring books instantly with AI. Enter any topic and get a custom PDF coloring book in minutes.',
  keywords: 'coloring book, AI, generator, kids, printable, PDF',
  metadataBase: new URL('https://bookmintai.ca'),
  openGraph: {
    title: 'BookMint AI — AI Coloring Book Generator',
    description: 'Generate beautiful, printable coloring books instantly with AI.',
    url: 'https://bookmintai.ca',
    siteName: 'BookMint AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookMint AI — AI Coloring Book Generator',
    description: 'Generate beautiful, printable coloring books instantly with AI.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
