import { Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store In | Dashboard",
  description: "Inventory management system",
};

export default function Home() {
  return (
    <div>
      <Typography variant="h1">dashboard</Typography>
    </div>
  );
}
