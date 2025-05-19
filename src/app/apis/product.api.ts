import {
  Category,
  CategoryApiResponse,
  Product,
  ProductApiResponse,
} from "@/app/types";
import axios from "axios";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";

export interface FetchProductsParams {
  offset?: number;
  limit?: number;
  title?: string;
  price_min?: number;
  price_max?: number;
  categoryId?: number[];
  sort?: string; // e.g., 'price:asc', 'title:desc'
}

export const getProducts = async (
  limit: number = 50,
  offset: number = 0,
  filterItems: Record<string, string>,
): Promise<Product[]> => {
  try {
    const response = await axios.get<ProductApiResponse[]>(
      `${API_BASE_URL}/products/`,
      {
        params: { ...filterItems, limit, offset },
      },
    );
    // The API returns products directly as an array
    // Ensure mapping if API structure differs from Product interface, especially for category
    return response.data.map((p) => ({
      ...p,
      // Category might be nested differently or need transformation
      // For this API, it seems the category object is directly usable.
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await axios.get<ProductApiResponse>(
      `${API_BASE_URL}/products/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<CategoryApiResponse[]>(
      `${API_BASE_URL}/categories`,
    );
    // Filter out categories with problematic image URLs if necessary, or handle image errors in component
    return response.data.filter(
      (cat) =>
        cat.name &&
        cat.image &&
        !cat.image.startsWith("[") &&
        !cat.image.endsWith("]"),
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
