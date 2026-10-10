import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SiteHeader from "@/components/layout/SiteHeader";
import CategoryNavigation from "@/components/layout/CategoryNavigation";
import PriceTicker from "@/components/layout/PriceTicker";
import SiteFooter from "@/components/layout/SiteFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BazarDor (বাজার দর)",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen text-gray-900`}>
        <SiteHeader />
        <CategoryNavigation />
        <PriceTicker />
        
        <div className="flex-grow">
          {children}
        </div>
        
        <SiteFooter />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}