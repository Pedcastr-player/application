import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";

import { Footer } from "@/components/Footer";
import Providers from "./provider";

import "./globals.css";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pedcastr",
  description: "An open source podcast player",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
