import { getProducts } from "@/services/product-service";
import HeroBanner from "@/components/home/HeroBanner";
import ProductGrid from "@/components/products/ProductGrid";
import PriceMovements from "@/components/home/PriceMovements";

export default async function HomePage() {
  const products = await getProducts();
  
  // Calculate price changes securely
  const validProducts = products.filter(p => p.priceChange !== undefined && p.priceChange !== null);
  const increases = [...validProducts].sort((a, b) => b.priceChange! - a.priceChange!).slice(0, 6);
  const decreases = [...validProducts].sort((a, b) => a.priceChange! - b.priceChange!).slice(0, 6);

  return (
    <main className="min-h-screen pb-12 bg-gray-50">
      <HeroBanner />
      
      <div className="container mx-auto px-4 max-w-7xl">
        {increases.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
              আজ দাম বেড়েছে <span className="text-red-500 ml-2">▲</span>
            </h2>
            <ProductGrid products={increases} layout="responsive" />
          </section>
        )}

        {decreases.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
              আজ দাম কমেছে <span className="text-green-500 ml-2">▼</span>
            </h2>
            <ProductGrid products={decreases} layout="responsive" />
          </section>
        )}

        <section id="সব-পণ্য" className="scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">সব পণ্য</h2>
            <p className="text-sm text-gray-500 mt-1">মোট {toBengaliNum(products.length)}টি পণ্য দেখানো হচ্ছে</p>
          </div>
          <ProductGrid products={products} layout="responsive" />
        </section>
      </div>
    </main>
  );
}