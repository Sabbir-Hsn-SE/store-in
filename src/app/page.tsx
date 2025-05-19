import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Store In | Dashboard",
  description: "Inventory management system",
};

export default function DashboardPage() {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 48px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: { xs: "flex-start", sm: "flex-start", md: "center" },
        textAlign: "center",
        gap: { xs: 2, md: 3 },
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
        p: { xs: 2, md: 6 },
        boxShadow: 2,
      }}
    >
      <Image
        src="/hero.svg"
        alt="Inventory Illustration"
        height={260}
        width={720}
        style={{ maxWidth: "100%", height: "auto" }}
        priority
      />
      <Typography variant="h3" fontWeight={700} color="primary.main">
        Store.in
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 500 }}>
        Your Smart Inventory Solution
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
        Effortlessly manage your products, track stock levels, and gain insights
        into your business. Store.in helps you stay organized and grow your
        inventory with ease.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 2, px: 4, borderRadius: 2 }}
        href="/products"
      >
        Explore Inventory
      </Button>
    </Box>
  );
}
