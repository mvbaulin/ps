import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { Header, Providers } from '@/components/shared';

import "normalize.css";
import "./globals.scss";

const font = Roboto_Flex({ subsets: ["cyrillic-ext"] });

export const metadata: Metadata = {
  title: "STORE",
  description: "STORE",
  robots: {
    index: false,
    follow: false,
  },
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
