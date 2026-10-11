import { getProducts } from "@/services/product-service";
import { toBengaliNum } from "@/utils/bengali";

const PriceTicker = async () => {
  const products = await getProducts();
  
  if (!products || products.length === 0) return null;

  return (
    <div className="w-full bg-white border-b border-gray-100 overflow-hidden py-2.5 flex whitespace-nowrap text-sm shadow-sm">
      <div className="animate-marquee flex gap-12">
        
        {[...products, ...products, ...products].map((p, i) => {
          const isUp = typeof p.priceChange === 'number' && p.priceChange > 0;
          const isDown = typeof p.priceChange === 'number' && p.priceChange < 0;

          return (
            <span key={i} className="flex items-center gap-2">
               <span className="text-base">{p.emoji || "📦"}</span>
               <span className="font-semibold text-gray-700">{p.name}</span>
               
               <span className="text-gray-500">
                 {toBengaliNum(p.currentPrice || 0)} টাকা/{(p.unit || "কেজি").replace('প্রতি ', '')}
               </span>
               
               {p.priceChange !== undefined && p.priceChange !== null && (
                 <span className={`font-bold flex items-center gap-0.5 ${isUp ? "text-red-600" : isDown ? "text-green-600" : "text-gray-500"}`}>
                   {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNum(Math.abs(p.priceChange))}%
                 </span>
               )}
            </span>
          );
        })}
        
      </div>
    </div>
  );
};

export default PriceTicker;