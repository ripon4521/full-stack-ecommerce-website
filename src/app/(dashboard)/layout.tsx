import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "../globals.css";
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borcelle - Admin Dashboard",
  description: "Admin dashboard to manage Borcelle's data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <div className="flex  max-lg:flex-col text-gray-600">
        <LeftSideBar></LeftSideBar>
        <TopBar></TopBar>
    <div className="flex-1">
    <body className={inter.className}>{children}</body>
    </div>
        </div>
      </html>
    </ClerkProvider>

  );
}
