import { Box, Chip } from "@mui/material";
import { useProductContext } from "../context";

export default function SelectedFilterBar() {
  const {
    setSelectedCategories,
    setSelectedPriceRanges,
    categories,
    priceRange,
  } = useProductContext();

  const handleRemoveCategoryFilter = (id: number) => {
    const newCategories = categories?.filter((cat) => cat.id !== id) || [];
    setSelectedCategories?.(newCategories);
  };

  const handleRemovePriceRangeFilter = (id: number) => {
    const newPriceRanges = priceRange?.filter((pr) => pr.id !== id) || [];
    setSelectedPriceRanges?.(newPriceRanges);
  };

  return (
    <Box
      sx={{
        display: {
          xs: "none",
          md: "flex",
        },
        flexDirection: "row-reverse",
        width: "100%",
        overflowX: "auto",
        gap: 1,
        minHeight: 40,
        alignItems: "center",
        pr: 1,
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {categories?.map((cat) => (
        <Chip
          variant="outlined"
          key={cat.id}
          label={cat.name}
          onDelete={() => handleRemoveCategoryFilter(cat.id)}
          size="small"
          color="info"
        />
      ))}
      {priceRange?.map((pr) => (
        <Chip
          variant="outlined"
          key={pr.label}
          label={pr.label}
          onDelete={() => handleRemovePriceRangeFilter(pr.id)}
          size="small"
          color="primary"
        />
      ))}
    </Box>
  );
}
