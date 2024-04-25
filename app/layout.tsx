import type { Metadata } from "next";
import { Inter, Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const BaiJamjuree = Bai_Jamjuree({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="forest" className="h-screen">
      <body className={BaiJamjuree.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
