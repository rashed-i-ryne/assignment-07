import Link from "next/link";
import { Product } from "@/types/api";
import { toBengaliNum } from "@/utils/bengali";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = typeof product.priceChange === 'number' && product.priceChange > 0;
  const isDown = typeof product.priceChange === 'number' && product.priceChange < 0;
  const displayUnit = product.unit?.includes('প্রতি') ? product.unit : `প্রতি ${product.unit || 'কেজি'}`;

  const getProductEmoji = (name: string, emoji?: string) => {
    if (emoji) return emoji;
    if (name.includes('ডাল')) return '🫘';
    if (name.includes('চাল')) return '🍚';
    if (name.includes('তেল')) return '🧴';
    if (name.includes('ডিম')) return '🥚';
    if (name.includes('মাছ')) return '🐟';
    if (name.includes('মাংস')) return '🥩';
    return '🛒';
  };

  return (
    <Link href={`/product/${product.id}`} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col justify-between min-h-[150px]">
   
      <div className="flex items-center gap-4 mb-5">
        <div className="text-3xl bg-gray-50/80 w-14 h-14 flex items-center justify-center rounded-full border border-gray-100 shrink-0">
          {getProductEmoji(product.name, product.emoji)}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.name}</h3>
          <p className="text-[13px] text-gray-500 mt-1 font-medium">{displayUnit}</p>
        </div>
      </div>
      
      <div className="flex items-end justify-between mt-auto">
        <div>
           <span className="text-[11px] text-gray-500 block mb-0.5 font-medium">আজকের দাম</span>
           <span className="font-bold text-xl text-gray-900">
             {toBengaliNum(product.currentPrice || 0)} <span className="text-[15px] font-medium text-gray-600">টাকা</span>
           </span>
        </div>
        
        {product.priceChange !== undefined && product.priceChange !== null && (
          <div className={`text-sm font-bold flex items-center gap-1 ${isUp ? 'text-red-600' : isDown ? 'text-green-600' : 'text-gray-500'}`}>
            {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNum(Math.abs(product.priceChange))}%
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;