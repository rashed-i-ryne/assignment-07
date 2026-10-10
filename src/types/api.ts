export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface MarketPrice {
  marketName: string;
  division?: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  unit: string;
  currentPrice: number | string;
  priceChange?: number;
  emoji?: string;
  description?: string;
  marketPrices?: MarketPrice[];
}