import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./custom.css";

import { ThemeProvider } from '@/context/ThemeContext';

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
