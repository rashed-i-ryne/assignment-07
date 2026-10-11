import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getProductById } from "@/services/product-service";
import { auth } from "@/lib/auth";
import MarketPriceTable from "@/components/products/MarketPriceTable";
import { toBengaliNum } from "@/utils/bengali";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session) {
    redirect(`/signin?callbackUrl=/product/${slug}`);
  }

  const product = await getProductById(slug);
  
  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">পণ্যটি পাওয়া যায়নি</h2>
        <p className="text-gray-500">তথ্য লোড করতে সমস্যা হচ্ছে।</p>
      </div>
    );
  }

  const isUp = typeof product.priceChange === 'number' && product.priceChange > 0;
  const isDown = typeof product.priceChange === 'number' && product.priceChange < 0;

  // Safely map and convert market prices to numbers without using 'any'
  const marketPricesList = product.marketPrices ?? [];
  const prices = marketPricesList.map((m) => {
    const item = m as { avg?: unknown; price?: unknown };
    return Number(item.avg ?? item.price ?? 0);
  });
  
  const currentPriceNum = Number(product.currentPrice);
  const lowestPrice = prices.length > 0 ? Math.min(...prices, currentPriceNum) : currentPriceNum;
  const highestPrice = prices.length > 0 ? Math.max(...prices, currentPriceNum) : currentPriceNum;

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      
      {/* ব্রেডক্রাম্ব বা নেভিগেশন পাথ */}
      <div className="text-sm text-gray-500 mb-6 flex gap-2 items-center font-medium">
        <Link href="/" className="hover:text-green-600">হোম</Link> 
        <span>&gt;</span> 
        <span className="text-gray-800 font-semibold">{product.name}</span>
      </div>

      {/* মেইন হেডার কার্ড */}
      <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center shadow-sm border border-gray-100 mb-10 gap-6">
        <div className="flex items-center gap-6 w-full">
          <div className="w-24 h-24 bg-[#F4F7F4] rounded-2xl flex items-center justify-center text-5xl border border-gray-100 shrink-0">
            {product.emoji || "📦"}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{product.name}</h1>
            <p className="text-gray-500 mb-3 font-medium">
              প্রতি {product.unit?.replace('প্রতি ', '') || 'কেজি'} {product.category ? `- ${product.category}` : ''}
            </p>
            {product.priceChange !== undefined && product.priceChange !== null && (
              <p className="text-sm text-gray-600 font-medium">
                গতকালের তুলনায় আজ দাম <span className="font-bold">{isUp ? 'বেড়েছে' : isDown ? 'কমেছে' : 'অপরিবর্তিত'}</span>
              </p>
            )}
          </div>
        </div>
        
        {/* আজকের দাম হাইলাইট বক্স */}
        <div className="bg-[#F8FAF9] rounded-xl p-6 min-w-[200px] text-center border border-gray-100 shrink-0 w-full md:w-auto">
          <p className="text-gray-500 text-sm font-bold mb-1">আজকের দাম</p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-1">{toBengaliNum(product.currentPrice)}</h2>
          <p className="text-gray-600 text-sm mb-2 font-medium">টাকা / {product.unit?.replace('প্রতি ', '') || 'কেজি'}</p>
          
          {product.priceChange !== undefined && product.priceChange !== null && (
            <div className={`font-bold text-sm inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-md mx-auto ${isUp ? 'text-red-600 bg-red-50' : isDown ? 'text-green-600 bg-green-50' : 'text-gray-500 bg-gray-100'}`}>
              {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNum(Math.abs(product.priceChange))}%
            </div>
          )}
        </div>
      </div>

      {/* দামের সারসংক্ষেপ সেকশন */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium mb-2">সর্বনিম্ন দাম</p>
          <p className="text-3xl font-extrabold text-green-600 mb-1">{toBengaliNum(lowestPrice)} <span className="text-lg font-medium">টাকা</span></p>
          <p className="text-xs text-gray-400 font-medium">সবচেয়ে কম দামের বাজার</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium mb-2">সর্বোচ্চ দাম</p>
          <p className="text-3xl font-extrabold text-red-600 mb-1">{toBengaliNum(highestPrice)} <span className="text-lg font-medium">টাকা</span></p>
          <p className="text-xs text-gray-400 font-medium">সবচেয়ে বেশি দামের বাজার</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium mb-2">গড় দাম</p>
          <p className="text-3xl font-extrabold text-green-600 mb-1">{toBengaliNum(product.currentPrice)} <span className="text-lg font-medium">টাকা</span></p>
          <p className="text-xs text-gray-400 font-medium">প্রতি এককের হিসাব</p>
        </div>

      </div>

      {/* বাজারভিত্তিক আজকের দাম টেবিল */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h3>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-10">
        <MarketPriceTable marketPrices={product.marketPrices || []} />
      </div>

    </main>
  );
}