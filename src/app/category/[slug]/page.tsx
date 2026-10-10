import { getProducts } from "@/services/product-service";
import ProductGrid from "@/components/products/ProductGrid";
import { parseBengaliNum } from "@/utils/bengali";

export default async function CategoryPage({ 
  params, searchParams 
}: { 
  params: { slug: string }, searchParams: { sort?: string } 
}) {
  const products = await getProducts(params.slug);
  let sortedProducts = [...products];

  if (searchParams.sort === "asc") {
    sortedProducts.sort((a, b) => parseBengaliNum(a.currentPrice.toString()) - parseBengaliNum(b.currentPrice.toString()));
  } else if (searchParams.sort === "desc") {
    sortedProducts.sort((a, b) => parseBengaliNum(b.currentPrice.toString()) - parseBengaliNum(a.currentPrice.toString()));
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
         <h1 className="text-xl font-bold capitalize">{params.slug}</h1>
         {/* Sort dropdown implemented via client component setting query params */}
         <CategorySortSelector currentSort={searchParams.sort || "default"} />
      </div>
      <ProductGrid products={sortedProducts} layout="responsive" />
    </main>
  );
}