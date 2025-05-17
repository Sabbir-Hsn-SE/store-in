"use client";
import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-roboto)",
    fontSize: 16, // default html font-size
  },
  palette: {
    background: {
      default: "#FFFFFF",
      paper: "#F4F6FB",
    },
    DataGrid: {
      headerBg: "#F5F5F5",
    },
  },
});

export default theme;
