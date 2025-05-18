import { Category, PriceRange } from "@/app/types";
import { createContext, useContext } from "react";

type ProductContextType = {
  categories?: Category[];
  priceRange?: PriceRange[];
  sortBy?: string;
  sortOrder?: string;
  setSelectedCategories?: (options: Category[]) => void;
  setSelectedPriceRanges?: (options: PriceRange[]) => void;
};

export const ProductContext = createContext<ProductContextType>({
  categories: [],
  priceRange: [],
  sortBy: "title",
  sortOrder: "asc",
});

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProductContext must be used within ProductProvider");
  }

  return context;
};
