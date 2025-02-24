import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finx Inventory",
  description: "Dashboard for Finx assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col justify-start pt-8 pb-4 pl-4 pr-4">
          <Navbar></Navbar>
          <Separator className="mt-4 mb-4" />
        </div>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
