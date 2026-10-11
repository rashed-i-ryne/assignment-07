import { getProducts } from "@/services/product-service";
import HeroBanner from "@/components/home/HeroBanner";
import ProductGrid from "@/components/products/ProductGrid";
import { toBengaliNum } from "@/utils/bengali";

const HomePage = async () => {
  const products = await getProducts();
  
  const increases = products
    .filter(p => typeof p.priceChange === 'number' && p.priceChange > 0)
    .sort((a, b) => b.priceChange! - a.priceChange!)
    .slice(0, 6);
    
  const decreases = products
    .filter(p => typeof p.priceChange === 'number' && p.priceChange < 0)
    .sort((a, b) => a.priceChange! - b.priceChange!)
    .slice(0, 6);

  return (
    <main className="min-h-screen pb-12 bg-[#f4f6f0]">
      <HeroBanner />
      
      <div className="container mx-auto px-4 max-w-7xl mt-8">
      
        {increases.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="text-red-600 text-sm">▲</span> আজ দাম বেড়েছে
            </h2>
            <ProductGrid products={increases} layout="responsive" />
          </section>
        )}

        {decreases.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="text-green-600 text-sm">▼</span> আজ দাম কমেছে
            </h2>
            <ProductGrid products={decreases} layout="responsive" />
          </section>
        )}

        <section id="সব-পণ্য" className="scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">সব পণ্য</h2>
            <p className="text-[13px] text-gray-500 mt-1 font-medium">মোট {toBengaliNum(products.length)}টি পণ্য দেখানো হচ্ছে</p>
          </div>
          <ProductGrid products={products} layout="responsive" />
        </section>
      </div>
    </main>
  );
};

export default HomePage;