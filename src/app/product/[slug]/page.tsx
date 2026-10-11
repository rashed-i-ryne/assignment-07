import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/services/product-service";
import MarketPriceTable from "@/components/products/MarketPriceTable";
import { toBengaliNum } from "@/utils/bengali";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const ProductDetailsContent = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProductById(slug);

  if (!product) {
    notFound();
  }

  const isUp = typeof product.priceChange === 'number' && product.priceChange > 0;
  const isDown = typeof product.priceChange === 'number' && product.priceChange < 0;
  const displayUnit = product.unit?.includes('প্রতি') ? product.unit : `প্রতি ${product.unit || 'কেজি'}`;

  const getProductEmoji = (name: string, emoji?: string) => {
    if (emoji && emoji !== '📦') return emoji;
    if (name.includes('ডাল')) return '🫘';
    if (name.includes('চাল')) return '🍚';
    if (name.includes('তেল')) return '🧴';
    if (name.includes('ডিম')) return '🥚';
    if (name.includes('মাছ')) return '🐟';
    if (name.includes('মাংস')) return '🥩';
    return '🛒';
  };

  const marketPrices = product.marketPrices || [];
  const minPrices = marketPrices.map(m => Number(m.minPrice)).filter(n => !isNaN(n));
  const maxPrices = marketPrices.map(m => Number(m.maxPrice)).filter(n => !isNaN(n));
  const avgPrices = marketPrices.map(m => Number(m.avgPrice)).filter(n => !isNaN(n));

  const absoluteMin = minPrices.length > 0 ? Math.min(...minPrices) : (typeof product.currentPrice === 'number' ? product.currentPrice : 0);
  const absoluteMax = maxPrices.length > 0 ? Math.max(...maxPrices) : (typeof product.currentPrice === 'number' ? product.currentPrice : 0);
  const overallAvg = avgPrices.length > 0 ? Math.round(avgPrices.reduce((a, b) => a + b, 0) / avgPrices.length) : (typeof product.currentPrice === 'number' ? product.currentPrice : 0);

  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900 transition-colors">হোম</Link>
        <span>›</span>
        <Link href={`/category/${product.category}`} className="hover:text-gray-900 transition-colors">{product.category}</Link>
        <span>›</span>
        <span className="text-gray-800 font-semibold">{product.name}</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex items-center gap-5">
          <div className="text-4xl bg-gray-50/80 w-20 h-20 flex items-center justify-center rounded-full border border-gray-100 shrink-0">
            {getProductEmoji(product.name, product.emoji)}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{displayUnit} · {product.category}</p>
            <p className="text-xs text-gray-500 mt-1.5">
              গতকালের তুলনায় আজ দাম <span className={isUp ? "text-red-600 font-semibold" : isDown ? "text-green-600 font-semibold" : "text-gray-700 font-semibold"}>
                {isUp ? 'বেড়েছে' : isDown ? 'কমেছে' : 'পরিবর্তন হয়নি'}
              </span> {product.priceChange ? `· ${toBengaliNum(Math.abs(product.priceChange))}%` : ''}
            </p>
          </div>
        </div>

        <div className="bg-[#fcfdfa] border border-gray-100 rounded-2xl px-6 py-4 flex flex-col items-center md:items-end w-full md:w-auto shrink-0 shadow-xs">
          <span className="text-[11px] text-gray-400 font-medium tracking-wide uppercase mb-0.5">আজকের দাম</span>
          <div className="text-3xl font-bold text-gray-900 tracking-tight">
            {toBengaliNum(product.currentPrice || 0)}
          </div>
          <span className="text-xs text-gray-500 font-medium mt-0.5">টাকা / {product.unit || 'কেজি'}</span>
          {product.priceChange !== undefined && product.priceChange !== null && (
            <div className={`text-xs font-bold flex items-center gap-1 mt-1.5 ${isUp ? 'text-red-600' : isDown ? 'text-green-600' : 'text-gray-500'}`}>
              {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNum(Math.abs(product.priceChange))}%
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-medium text-gray-400 block mb-2">সর্বনিম্ন দাম</span>
              <div className="text-3xl font-bold text-emerald-600 mb-1.5">
                {toBengaliNum(absoluteMin)} <span className="text-lg font-semibold text-gray-700">টাকা</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">সবচেয়ে কম দামের বাজার</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-medium text-gray-400 block mb-2">সর্বাধিক দাম</span>
              <div className="text-3xl font-bold text-rose-600 mb-1.5">
                {toBengaliNum(absoluteMax)} <span className="text-lg font-semibold text-gray-700">টাকা</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-medium text-gray-400 block mb-2">গড় দাম</span>
              <div className="text-3xl font-bold text-emerald-600 mb-1.5">
                {toBengaliNum(overallAvg)} <span className="text-lg font-semibold text-gray-700">টাকা</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">{displayUnit}-এর হিসাবে</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <MarketPriceTable marketPrices={marketPrices} />
      </div>
    </>
  );
};

const ProductPage = ({ params }: ProductPageProps) => {
  return (
    <main className="min-h-screen pb-12 bg-[#f4f6f0]">
      <div className="container mx-auto px-4 max-w-7xl pt-6">
        <Suspense fallback={<div className="py-20 text-center text-gray-500 font-medium">লোড হচ্ছে...</div>}>
          <ProductDetailsContent params={params} />
        </Suspense>
      </div>
    </main>
  );
};

export default ProductPage;