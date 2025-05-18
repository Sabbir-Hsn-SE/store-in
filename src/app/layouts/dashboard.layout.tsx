"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "@/components/top-bar";
import SideBar from "@/components/side-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpenClose = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar open={open} handleDrawerOpenClose={handleDrawerOpenClose} />
      <SideBar open={open} handleDrawerOpenClose={handleDrawerOpenClose} />
      <Box
        component="main"
        sx={{ flexGrow: 1, marginTop: "3rem", overflow: "auto" }}
      >
        {children}
      </Box>
    </Box>
  );
}
