import { Product } from "@/types/api";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, layout = "responsive" }: { products: Product[], layout?: "responsive" | "table" }) {
  if (!products || products.length === 0) {
    return <div className="py-12 text-center text-gray-500 bg-white border border-gray-100 rounded-xl">কোনো পণ্য পাওয়া যায়নি।</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id || product.slug || product.name} product={product} />
      ))}
    </div>
  );
}