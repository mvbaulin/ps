import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import { Header, Providers } from '@/components/shared';

import "normalize.css";
import "./globals.scss";

const font = Roboto_Condensed({ subsets: ["cyrillic-ext"] });

export const metadata: Metadata = {
  title: "STORE",
  description: "STORE",
  robots: {
    index: false,
    follow: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={font.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
