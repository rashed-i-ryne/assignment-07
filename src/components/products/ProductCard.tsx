import Link from "next/link";
import { Product } from "@/types/api";
import { toBengaliNum } from "@/utils/bengali";

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.priceChange && product.priceChange > 0;
  const isDown = product.priceChange && product.priceChange < 0;

  // Notice the href is now using product.id to match the API endpoint correctly
  return (
    <Link href={`/product/${product.id}`} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className="text-4xl bg-gray-50 p-3 rounded-full group-hover:scale-105 transition-transform border border-gray-100">
          {product.emoji || "📦"}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
          <p className="text-xs text-gray-500 font-medium">{product.unit || "কেজি"}</p>
          <div className="mt-2">
             <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-0.5">আজকের দাম</span>
             <span className="font-bold text-xl text-gray-900">
               {toBengaliNum(product.currentPrice || 0)} <span className="text-sm font-medium text-gray-500">টাকা</span>
             </span>
          </div>
        </div>
      </div>
      
      {product.priceChange !== undefined && product.priceChange !== null && (
        <div className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ${isUp ? 'text-red-700 bg-red-50' : isDown ? 'text-green-700 bg-green-50' : 'text-gray-600 bg-gray-100'}`}>
          {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNum(Math.abs(product.priceChange))}%
        </div>
      )}
    </Link>
  );
}