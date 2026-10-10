import Link from "next/link";
import { Product } from "@/types/api";
import { toBengaliNum } from "@/utils/bengali";

export default function ProductCard({ product }: { product: Product }) {
  // নিশ্চিত করা হচ্ছে যে পরিবর্তনটি শুধুমাত্র পজিটিভ বা নেগেটিভ হলেই কাজ করবে
  const isUp = typeof product.priceChange === 'number' && product.priceChange > 0;
  const isDown = typeof product.priceChange === 'number' && product.priceChange < 0;

  // "প্রতি" শব্দটি না থাকলে যোগ করে দেওয়া হচ্ছে
  const displayUnit = product.unit?.includes('প্রতি') ? product.unit : `প্রতি ${product.unit || 'কেজি'}`;

  return (
    <Link href={`/product/${product.id}`} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col justify-between min-h-[150px]">
      
      {/* উপরের অংশ: ইমোজি, নাম এবং ইউনিট */}
      <div className="flex items-center gap-4 mb-5">
        <div className="text-3xl bg-gray-50/80 w-14 h-14 flex items-center justify-center rounded-full border border-gray-100">
          {product.emoji || "📦"}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.name}</h3>
          <p className="text-[13px] text-gray-500 mt-1 font-medium">{displayUnit}</p>
        </div>
      </div>
      
      {/* নিচের অংশ: আজকের দাম এবং দামের পরিবর্তন (ডান দিকে) */}
      <div className="flex items-end justify-between mt-auto">
        <div>
           <span className="text-[11px] text-gray-500 block mb-0.5 font-medium">আজকের দাম</span>
           <span className="font-bold text-xl text-gray-900">
             {toBengaliNum(product.currentPrice || 0)} <span className="text-[15px] font-medium text-gray-600">টাকা</span>
           </span>
        </div>
        
        {/* ছবির মতো ব্যাকগ্রাউন্ড ছাড়া শুধুমাত্র লাল/সবুজ টেক্সট */}
        {product.priceChange !== undefined && product.priceChange !== null && (
          <div className={`text-sm font-bold flex items-center gap-1 ${isUp ? 'text-red-600' : isDown ? 'text-green-600' : 'text-gray-500'}`}>
            {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNum(Math.abs(product.priceChange))}%
          </div>
        )}
      </div>
    </Link>
  );
}