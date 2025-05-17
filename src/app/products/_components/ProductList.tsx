/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridFilterItem,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import useColumnDef from "../_hooks/useColumnDef.hook";
import CustomToolbar from "@/components/grid-toobar";
import { getProducts } from "@/app/apis/product.api";
import { Product } from "@/app/types";
import { Alert } from "@mui/material";
import useProductList from "../_hooks/useProductList.hook";

export default function ProductList() {
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
  } = useProductList();
  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={products || []}
        columns={columns}
        sx={{
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
        }}
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
        disableRowSelectionOnClick
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
  );
}
