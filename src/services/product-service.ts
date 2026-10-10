import { Product, Category } from "@/types/api";

const BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

// 🚀 UPDATED MAPPER: Now uses the exact keys from your API ('nameBn', 'today', 'image', etc.)
const mapApiToProduct = (item: any): Product => {
  return {
    id: item?.id?.toString() || Math.random().toString(),
    name: item?.nameBn || "অজানা পণ্য",
    slug: item?.slug || "",
    category: item?.categoryNameBn || item?.category || "other",
    unit: item?.unit === 'kg' ? 'কেজি' : item?.unit === 'litre' ? 'লিটার' : item?.unit || "কেজি",
    currentPrice: item?.today ?? 0,
    priceChange: item?.change?.pct ?? null,
    emoji: item?.image || "📦",
    description: "",
    marketPrices: Array.isArray(item?.markets) ? item.markets.map((m: any) => ({
      marketName: m.market,
      division: m.division,
      minPrice: m.min,
      maxPrice: m.max,
      avgPrice: Math.round((m.min + m.max) / 2) // Calculates the average price for your UI table
    })) : [],
  };
};

export const getProducts = async (categorySlug?: string): Promise<Product[]> => {
  try {
    const url = categorySlug 
      ? `${BASE_URL}/products?category=${categorySlug}` 
      : `${BASE_URL}/products`;
      
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    
    const data = await res.json();
    const rawProducts = Array.isArray(data) ? data : (data.products || data.data || []);
    
    return rawProducts.map(mapApiToProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    
    const data = await res.json();
    const item = data.product || data.data || data;
    
    return item ? mapApiToProduct(item) : null;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${BASE_URL}/categories`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    
    const data = await res.json();
    const rawCategories = Array.isArray(data) ? data : (data.categories || data.data || []);
    
    return rawCategories.map((c: any) => ({
      id: c?.id?.toString() || c?.slug,
      name: c?.nameBn || c?.name || "অজানা ক্যাটাগরি",
      slug: c?.slug || c?.id?.toString(),
      icon: c?.icon || c?.emoji || "🛒"
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
  try {
    const res = await fetch(`${BASE_URL}/categories/${id}`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    
    const data = await res.json();
    const c = data.category || data.data || data;
    
    if (!c) return null;
    
    return {
      id: c?.id?.toString() || c?.slug,
      name: c?.nameBn || c?.name || "অজানা ক্যাটাগরি",
      slug: c?.slug || c?.id?.toString(),
      icon: c?.icon || c?.emoji || "🛒"
    };
  } catch (error) {
    console.error("Error fetching single category:", error);
    return null;
  }
};