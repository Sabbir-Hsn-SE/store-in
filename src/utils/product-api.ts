// src/lib/api.ts
import { Category, Product, ProductResponse } from "@/app/types";
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

export const fetchProducts = async (params: FetchProductsParams = {}) => {
  const {
    offset = 0,
    limit = 10,
    title,
    price_min,
    price_max,
    categoryId,
    sort,
  } = params;
  const queryParams: Record<string, string | number | string[]> = {
    offset,
    limit,
  };

  if (title) queryParams.title = title;
  if (price_min) queryParams.price_min = price_min;
  if (price_max) queryParams.price_max = price_max;
  if (categoryId && categoryId.length > 0)
    queryParams.categoryId = categoryId.join(",");
  if (sort) {
    const [field, order] = sort.split(":");
    queryParams.sort_by = field;
    queryParams.order = order;
  }

  const response = await axios.get(`${API_BASE_URL}/products`, {
    params: queryParams,
  });
  return response.data as ProductResponse;
};

export const fetchProductById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data as Product;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data as Category[];
};
