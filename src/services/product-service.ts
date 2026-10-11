import { Product, Category } from "@/types/api";

const BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

type ApiMarket = {
  market?: string;
  division?: string;
  min?: number;
  max?: number;
};

type ApiProduct = {
  id?: string | number;
  nameBn?: string;
  slug?: string;
  categoryNameBn?: string;
  category?: string;
  unit?: string;
  today?: number;
  change?: {
    pct?: number;
  };
  image?: string;
  markets?: ApiMarket[];
};

type ApiCategory = {
  id?: string | number;
  nameBn?: string;
  name?: string;
  slug?: string;
  icon?: string;
  emoji?: string;
};

type ApiResponse<T> = {
  product?: T;
  products?: T[];
  category?: T;
  categories?: T[];
  data?: T[] | T;
};

const mapApiToProduct = (item: ApiProduct): Product => {
  return {
    id: item?.id?.toString() || Math.random().toString(),
    name: item?.nameBn || "অজানা পণ্য",
    slug: item?.slug || "",
    category: item?.categoryNameBn || item?.category || "other",
    unit: item?.unit === 'kg' ? 'কেজি' : item?.unit === 'litre' ? 'লিটার' : item?.unit || "কেজি",
    currentPrice: item?.today ?? 0,
    priceChange: item?.change?.pct ?? undefined,
    emoji: item?.image || "📦",
    description: "",
    marketPrices: Array.isArray(item?.markets) ? item.markets.map((m: ApiMarket) => ({
      marketName: m.market || "",
      division: m.division,
      minPrice: m.min || 0,
      maxPrice: m.max || 0,
      avgPrice: Math.round(((m.min || 0) + (m.max || 0)) / 2)
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
    
    const data = (await res.json()) as ApiProduct[] | ApiResponse<ApiProduct>;
    const rawProducts = Array.isArray(data) ? data : (data.products || data.data || []);
    
    return (rawProducts as ApiProduct[]).map(mapApiToProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    
    const data = (await res.json()) as ApiResponse<ApiProduct>;
    const item = data.product || data.data || (data as unknown as ApiProduct);
    
    return item ? mapApiToProduct(item as ApiProduct) : null;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${BASE_URL}/categories`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    
    const data = (await res.json()) as ApiCategory[] | ApiResponse<ApiCategory>;
    const rawCategories = Array.isArray(data) ? data : (data.categories || data.data || []);
    
    return (rawCategories as ApiCategory[]).map((c: ApiCategory) => ({
      id: c?.id?.toString() || c?.slug || "",
      name: c?.nameBn || c?.name || "অজানা ক্যাটাগরি",
      slug: c?.slug || c?.id?.toString() || "",
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
    
    const data = (await res.json()) as ApiResponse<ApiCategory>;
    const c = data.category || data.data || (data as unknown as ApiCategory);
    
    if (!c) return null;
    
    const cat = c as ApiCategory;
    return {
      id: cat?.id?.toString() || cat?.slug || "",
      name: cat?.nameBn || cat?.name || "অজানা ক্যাটাগরি",
      slug: cat?.slug || cat?.id?.toString() || "",
      icon: cat?.icon || cat?.emoji || "🛒"
    };
  } catch (error) {
    console.error("Error fetching single category:", error);
    return null;
  }
};