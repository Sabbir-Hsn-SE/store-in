import { getProducts } from "@/app/apis/product.api";
import { Category, PriceRange, Product } from "@/app/types";
import {
  GridFilterItem,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useColumnDef from "./useColumnDef.hook";

export default function useProductList() {
  const { columns } = useColumnDef();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRange[]>(
    [],
  );

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
    quickFilterValues: [],
  });

  const validateFilter = (filterModel: GridFilterItem[]) => {
    let filterItems: Record<string, string> = {};
    filterModel.map((item) => {
      if (item.value || item.value === 0) {
        filterItems = { ...filterItems, [item.field]: item.value };
      }
    });
    return filterItems;
  };

  useEffect(() => {
    const filterItems = validateFilter([
      ...filterModel.items,
      ...(filterModel.quickFilterValues?.[0]
        ? [
            {
              field: "title",
              value: filterModel.quickFilterValues[0],
              operator: "contains",
            },
          ]
        : []),
      ...(selectedCategories.length > 0
        ? [
            {
              field: "categoryId",
              value: selectedCategories[selectedCategories.length - 1].id,
              operator: "equals",
            },
          ]
        : []),
      ...(selectedPriceRanges.length > 0
        ? [
            {
              field: "price_max",
              value:
                selectedPriceRanges[selectedPriceRanges.length - 1].price_max,
              operator: "isGreaterThanOrEqualTo",
            },
            {
              field: "price_min",
              value:
                selectedPriceRanges[selectedPriceRanges.length - 1].price_min,
              operator: "isLessThanOrEqualTo",
            },
          ]
        : []),
    ]);
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts(
          paginationModel.pageSize,
          paginationModel.page * 10,
          filterItems,
        );
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [paginationModel, filterModel, selectedCategories, selectedPriceRanges]);

  const handleSelectedCategories = (options: Category[]) => {
    setSelectedCategories(options);
  };

  const handleSelectedPriceRanges = (options: PriceRange[]) => {
    setSelectedPriceRanges(options);
  };

  return {
    columns,
    products,
    error,
    loading,
    paginationModel,
    setPaginationModel,
    filterModel,
    setFilterModel,
    sortModel,
    setSortModel,
    selectedCategories,
    handleSelectedCategories,
    selectedPriceRanges,
    handleSelectedPriceRanges,
  };
}
