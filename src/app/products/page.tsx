import React from "react";
import ProductList from "./components/ProductList";
import LayoutContent from "../layouts/layout-content";
import { Box, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store In | Products",
  description: "Your inventory management system",
};

const ProductsPage = () => {
  return (
    <LayoutContent
      SubHeaderComponent={<Typography variant="subtitle1">Products</Typography>}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          borderRadius: 2,
          backgroundColor: "background.default",
          padding: 2,
        }}
      >
        <ProductList />
      </Box>
    </LayoutContent>
  );
};

export default ProductsPage;
