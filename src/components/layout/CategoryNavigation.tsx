"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const categories = [
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🧆" },
  { name: "তেল", slug: "tel", icon: "🛢️" },
  { name: "সবজি", slug: "sobji", icon: "🥬" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🍗" },
  { name: "ডিম-দুধ", slug: "dim", icon: "🥛" },
  { name: "মসলা", slug: "mosla", icon: "🌶️" },
];

const CategoryNavigation = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 py-3 sticky top-[73px] z-40">
      <div className="container mx-auto max-w-7xl px-6">
        
        <div className="flex md:hidden justify-between items-center">
          <span className="text-sm font-bold text-gray-700">ক্যাটাগরি সমূহ</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-sm font-semibold bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg border border-gray-200 transition-colors text-gray-700"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
            <span>মেনু</span>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2 pb-2">
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 text-sm font-semibold transition-all px-4 py-2.5 rounded-lg border ${
                    isActive 
                      ? "bg-green-600 text-white border-green-600 shadow-sm" 
                      : "bg-white text-gray-600 border-gray-100 hover:bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  {cat.name}
                </Link>
              );
            })}
          </div>
        )}

        <div className="hidden md:flex gap-3 items-center justify-start overflow-x-auto scrollbar-hide">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-2 text-sm font-semibold transition-all px-4 py-2 rounded-full border shrink-0 ${
                  isActive 
                    ? "bg-green-600 text-white border-green-600 shadow-sm" 
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                {cat.name}
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
};

export default CategoryNavigation;