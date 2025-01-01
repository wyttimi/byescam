import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'ByeScam - Protect yourself from crypto scams',
  description: 'A community-driven platform to report and prevent cryptocurrency scams',
  openGraph: {
    title: 'ByeScam - Protect yourself from crypto scams',
    description: 'A community-driven platform to report and prevent cryptocurrency scams',
    type: 'website',
    siteName: 'ByeScam',
    locale: 'en_US',
    images: [
      {
        url: '/image.png',
        width: 1200,
        height: 630,
        alt: 'ByeScam Preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ByeScam - Protect yourself from crypto scams',
    description: 'A community-driven platform to report and prevent cryptocurrency scams',
    images: ['/image.png']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      </Providers>
    </html>
  );
}
