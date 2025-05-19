"use client";
import { Box, Typography, Button } from "@mui/material";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 48px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
        p: { xs: 2, md: 6 },
        boxShadow: 2,
      }}
    >
      <Typography variant="h3" color="warning" fontWeight={700}>
        Opps! Something went wrong!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {error.message || "An unexpected error occurred. Please try again."}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => reset()}
        sx={{ mt: 2, px: 4, borderRadius: 2 }}
      >
        Try Again
      </Button>
    </Box>
  );
}
