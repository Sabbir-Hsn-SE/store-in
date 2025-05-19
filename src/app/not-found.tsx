import { Box, Typography, Button } from "@mui/material";

export default function NotFound() {
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
      <Typography variant="h3" color="text.disabled" fontWeight={700}>
        404 - Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The page you are looking for does not exist.
      </Typography>
      <Button
        href="/"
        variant="contained"
        color="primary"
        sx={{ mt: 2, px: 4, borderRadius: 2 }}
      >
        Go Home
      </Button>
    </Box>
  );
}
