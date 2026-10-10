import { getProducts, getCategoryById } from "@/services/product-service";
import ProductGrid from "@/components/products/ProductGrid";
import CategorySortSelector from "@/components/products/CategorySortSelector";
import { parseBengaliNum, toBengaliNum } from "@/utils/bengali";

// 🚀 ADDED THIS LINE: Tells Next.js to allow this page to wait for the API data safely
export const instant = false;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slug = resolvedParams.slug;
  const sort = resolvedSearchParams.sort;

  const [products, category] = await Promise.all([
    getProducts(slug),
    getCategoryById(slug)
  ]);
  
 const sortedProducts = [...products];

  if (sort === "asc") {
    sortedProducts.sort((a, b) => parseBengaliNum(String(a.currentPrice || "0")) - parseBengaliNum(String(b.currentPrice || "0")));
  } else if (sort === "desc") {
    sortedProducts.sort((a, b) => parseBengaliNum(String(b.currentPrice || "0")) - parseBengaliNum(String(a.currentPrice || "0")));
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6 flex items-center gap-5">
        <div className="text-4xl bg-gray-50 p-4 rounded-full border border-gray-100">
          {category?.icon || "🛒"}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{category?.name || slug}</h1>
          <p className="text-gray-500 mt-1">{toBengaliNum(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm gap-4">
         <div className="text-sm text-gray-500 font-medium">মোট {toBengaliNum(products.length)}টি পণ্য দেখানো হচ্ছে</div>
         <CategorySortSelector currentSort={sort || "default"} />
      </div>

      <ProductGrid products={sortedProducts} layout="responsive" />
    </main>
  );
}