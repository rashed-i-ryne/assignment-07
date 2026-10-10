import { getProducts } from "@/services/product-service";
import { toBengaliNum } from "@/utils/bengali";

export default async function PriceTicker() {
  const products = await getProducts();
  if (!products.length) return null;

  return (
    <div className="w-full bg-white border-b border-gray-100 overflow-hidden py-2.5 flex whitespace-nowrap text-sm shadow-sm">
      <div className="animate-marquee flex gap-12">
        {/* Tripled array to ensure smooth infinite scrolling visually */}
        {[...products, ...products, ...products].map((p, i) => (
          <span key={i} className="flex items-center gap-2">
             <span className="text-base">{p.emoji || "📦"}</span>
             <span className="font-semibold text-gray-700">{p.name}</span>
             <span className="text-gray-500">{toBengaliNum(p.currentPrice)} টাকা/{p.unit.replace('প্রতি ', '')}</span>
             {p.priceChange !== undefined && p.priceChange !== null && (
               <span className={`font-bold flex items-center gap-0.5 ${p.priceChange > 0 ? "text-red-500" : p.priceChange < 0 ? "text-green-500" : "text-gray-400"}`}>
                 {p.priceChange > 0 ? '▲' : p.priceChange < 0 ? '▼' : '—'} {toBengaliNum(Math.abs(p.priceChange))}%
               </span>
             )}
          </span>
        ))}
      </div>
    </div>
  );
}