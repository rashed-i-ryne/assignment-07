"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Category data mapping based on your UI design screenshots
const categories = [
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🧆" },
  { name: "তেল", slug: "oil", icon: "🛢️" },
  { name: "সবজি", slug: "vegetables", icon: "🥬" },
  { name: "মাছ", slug: "fish", icon: "🐟" },
  { name: "মাংস", slug: "meat", icon: "🍗" },
  { name: "ডিম-দুধ", slug: "egg-milk", icon: "🥛" },
  { name: "মসলা", slug: "spices", icon: "🌶️" },
];

export default function CategoryNavigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-100 py-3 overflow-x-auto scrollbar-hide">
      <div className="container mx-auto max-w-7xl px-6 flex gap-2 sm:gap-6 items-center min-w-max justify-start lg:justify-center">
        {categories.map((cat) => {
          const isActive = pathname === `/category/${cat.slug}`;
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`flex items-center gap-2 text-sm font-semibold transition-all px-4 py-2 rounded-full border ${
                isActive 
                  ? "bg-green-600 text-white border-green-600 shadow-sm" 
                  : "bg-white text-gray-600 border-transparent hover:bg-gray-50 hover:border-gray-200"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}