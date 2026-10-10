import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getProductById } from "@/services/product-service";
import { auth } from "@/lib/auth";
import MarketPriceTable from "@/components/products/MarketPriceTable";
import { toBengaliNum } from "@/utils/bengali";

// 🚀 ADDED THIS LINE:
export const instant = false;

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

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="text-6xl bg-gray-50 p-6 rounded-full border border-gray-100">
            {product.emoji || "📦"}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-500 mt-2 font-medium">{product.unit} - {product.category}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center min-w-[150px] w-full md:w-auto">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">আজকের দাম</p>
          <p className="text-4xl font-black text-gray-900 flex justify-center items-end gap-1">
            {toBengaliNum(product.currentPrice)}
          </p>
          <p className="text-sm text-gray-500 mt-1 font-medium">টাকা / {product.unit.replace('প্রতি ', '')}</p>
        </div>
      </div>
      <MarketPriceTable marketPrices={product.marketPrices || []} />
    </main>
  );
}