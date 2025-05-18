/* eslint-disable @typescript-eslint/no-empty-object-type */
// interfaces/index.ts
export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  // Add other fields from the API if needed, e.g., creationAt, updatedAt
}

// For API responses if they have a specific structure
export interface ProductApiResponse extends Product {}
export interface CategoryApiResponse extends Category {}

export interface PriceRange {
  id: number;
  label: string;
  price_min: number;
  price_max: number;
}
