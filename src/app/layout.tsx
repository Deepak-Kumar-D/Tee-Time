import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tee-Time",
  description: "Where T-shirt makes the day",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
