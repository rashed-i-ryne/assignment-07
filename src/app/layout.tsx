import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SiteHeader from "@/components/layout/SiteHeader";
import CategoryNavigation from "@/components/layout/CategoryNavigation";
import PriceTicker from "@/components/layout/PriceTicker";
import SiteFooter from "@/components/layout/SiteFooter";
import { Suspense } from "react"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BazarDor (বাজার দর)",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen text-gray-900`}>
        <SiteHeader />
        
        <Suspense fallback={<div className="h-12 bg-white border-b border-gray-100"></div>}>
          <CategoryNavigation />
        </Suspense>
        
        <Suspense fallback={<div className="h-8 bg-gray-200 animate-pulse flex items-center justify-center text-sm">Loading ticker...</div>}>
          <PriceTicker />
        </Suspense>
        
        <div className="flex-grow">
          {children}
        </div>
        
        <SiteFooter />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
};

export default RootLayout;