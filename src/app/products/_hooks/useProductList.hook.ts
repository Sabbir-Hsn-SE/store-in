/* eslint-disable @typescript-eslint/no-unused-vars */
import { getProducts } from "@/app/apis/product.api";
import { Product } from "@/app/types";
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

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
    quickFilterValues: [],
  });
  console.log(sortModel);

  const validateFilter = (filterModel: GridFilterItem[]) => {
    let filterItems: Record<string, string> = {};
    filterModel.map((item) => {
      if (!!item.value) {
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
  }, [paginationModel, filterModel]);

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
  };
}
