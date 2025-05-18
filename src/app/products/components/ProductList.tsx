"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import CustomToolbar from "@/app/products/components/CustomToolbar";
import { Alert } from "@mui/material";
import useProductList from "../hooks/useProductList.hook";
import { useRouter } from "next/navigation";
import { ProductContext } from "../context";

const customStyles = {
  border: "none",
  "& .MuiDataGrid-columnHeaders": {
    height: "40px !important",
    "& .MuiDataGrid-columnHeader": {
      borderBottom: "0 !important",
      borderTop: "0 !important",
    },
    // Set the header row height here
  },
  "& .MuiDataGrid-toolbar": {
    borderBottom: "0 !important",
    borderTop: "0 !important",
  },
  " & .MuiDataGrid-columnHeader:focus-within": {
    outline: "none !important",
  },
  "& .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
};

export default function ProductList() {
  const router = useRouter();

  const {
    products,
    error,
    loading,
    paginationModel,
    setPaginationModel,
    filterModel,
    setFilterModel,
    sortModel,
    setSortModel,
    columns,
    selectedCategories,
    handleSelectedCategories,
    selectedPriceRanges,
    handleSelectedPriceRanges,
  } = useProductList();
  console.log(selectedCategories);
  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
  return (
    <ProductContext.Provider
      value={{
        setSelectedCategories: handleSelectedCategories,
        categories: selectedCategories,
        setSelectedPriceRanges: handleSelectedPriceRanges,
        priceRange: selectedPriceRanges,
      }}
    >
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={products || []}
          columns={columns}
          sx={customStyles}
          loading={loading}
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
          showToolbar
          showColumnVerticalBorder={false}
          showCellVerticalBorder={false}
          rowHeight={58}
          initialState={{
            pagination: {
              paginationModel,
            },
            filter: {
              filterModel,
            },
            sorting: {
              sortModel,
            },
          }}
          rowCount={61}
          pageSizeOptions={[10, 20, 30]}
          onRowClick={(params) => {
            router.push(`/products/${params.row.id}`);
          }}
          isRowSelectable={() => true}
          disableMultipleRowSelection
          isCellEditable={() => false}
          paginationMode="server"
          onPaginationModelChange={(model: GridPaginationModel) => {
            setPaginationModel({
              pageSize: model.pageSize,
              page: model.page,
            });
          }}
          filterMode="server"
          filterDebounceMs={500}
          onFilterModelChange={(newFilterModel) => {
            setFilterModel(newFilterModel);
          }}
          onSortModelChange={setSortModel}
        />
      </Box>
    </ProductContext.Provider>
  );
}
