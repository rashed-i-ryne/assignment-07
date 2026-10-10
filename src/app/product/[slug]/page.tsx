import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getProductBySlug } from "@/services/product-service";
import { auth } from "@/lib/auth";
import MarketPriceTable from "@/components/products/MarketPriceTable";
import { toBengaliNum } from "@/utils/bengali";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session) {
    redirect(`/signin?callbackUrl=/product/${params.slug}`);
  }

  const product = await getProductBySlug(params.slug);
  if (!product) return <div className="text-center py-20 text-gray-500">পণ্যটি পাওয়া যায়নি।</div>;

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Product Summary Header matches UI Design */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center mb-8">
        <div className="text-6xl mr-6 bg-gray-50 p-4 rounded-full">{product.emoji || "📦"}</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-500 mt-1">{product.unit}</p>
        </div>
      </div>
      
      <MarketPriceTable marketPrices={product.marketPrices || []} />
    </main>
  );
}