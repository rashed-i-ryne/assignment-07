import { Product, Category } from "@/types/api";

const BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

export const getProducts = async (categorySlug?: string): Promise<Product[]> => {
  try {
    const url = categorySlug 
      ? `${BASE_URL}/products?category=${categorySlug}` 
      : `${BASE_URL}/products`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return Array.isArray(data) ? data : (data.products || []);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${BASE_URL}/products/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.product || data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${BASE_URL}/categories`, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    return Array.isArray(data) ? data : (data.categories || []);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};