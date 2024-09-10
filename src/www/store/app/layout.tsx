import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";

const font = Roboto_Condensed({ subsets: ["cyrillic-ext"] });

export const metadata: Metadata = {
  title: "CRM",
  description: "CRM",
  robots: {
    index: false,
    follow: false,
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
        {children}
      </body>
    </html>
  );
}
