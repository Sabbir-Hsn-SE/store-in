import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  ToolbarButton,
  QuickFilter,
  QuickFilterControl,
  QuickFilterClear,
} from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import FilterListIcon from "@mui/icons-material/FilterList";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { useProductContext } from "../context";
import { getCategories } from "@/app/apis/product.api";
import { Category } from "@/app/types";
import {
  Autocomplete,
  ClickAwayListener,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { Fade } from "@mui/material";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import { PRICE_RANGES } from "@/constants/products";
import SelectedFilterBar from "./SelectedFilterBar";
import theme from "@/theme/muiTheme";

type OwnerState = {
  expanded: boolean;
  isMobile: boolean;
};

const StyledQuickFilter = styled(QuickFilter)({
  display: "grid",
  alignItems: "flex-start",
});

const StyledTextField = styled(TextField)<{
  ownerState: OwnerState;
}>(({ theme, ownerState }) => ({
  gridArea: "1 / 1",
  overflowX: "clip",
  width: ownerState.isMobile ? 172 : 260,
  opacity: ownerState.expanded ? 1 : 0,
  transition: theme.transitions.create(["width", "opacity"]),
}));

export default function CustomToolbar() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(true);
  const [categoryOption, setCategoryOption] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const {
    setSelectedCategories,
    setSelectedPriceRanges,
    categories,
    priceRange,
  } = useProductContext();
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategoryOption(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement as "bottom" | "top");
    };

  return (
    <Toolbar style={{ marginBottom: "10px" }}>
      <Box width="100%">
        <StyledQuickFilter>
          <QuickFilterControl
            render={({ ref, ...controlProps }, state) => (
              <StyledTextField
                {...controlProps}
                color="info"
                ownerState={{ expanded: true, isMobile: isMobile }}
                inputRef={ref}
                aria-label="Search"
                placeholder="Search..."
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: state.value ? (
                      <InputAdornment position="end">
                        <QuickFilterClear
                          edge="end"
                          size="small"
                          aria-label="Clear search"
                          material={{ sx: { marginRight: -0.75 } }}
                        >
                          <CancelIcon fontSize="small" />
                        </QuickFilterClear>
                      </InputAdornment>
                    ) : null,
                    ...controlProps.slotProps?.input,
                  },
                  ...controlProps.slotProps,
                }}
              />
            )}
          />
        </StyledQuickFilter>
      </Box>

      <SelectedFilterBar />

      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ mx: 0.5 }}
      />

      <Popper
        sx={{ zIndex: 1200 }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <ClickAwayListener
            onClickAway={(event) => {
              // Prevent closing if click is inside a MUI Popper/Popover (e.g., Select dropdown)
              const popper = document.querySelector(
                ".MuiPopover-root, .MuiPopper-root",
              );
              if (popper && popper.contains(event.target as Node)) {
                return;
              }
              setOpen(false);
            }}
          >
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                component={Box}
                sx={{
                  maxWidth: {
                    xs: "220px",
                    sm: "560px",
                    md: "684px",
                    lg: "900px",
                  },
                }}
              >
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    gap: "1rem",
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                  }}
                >
                  <Autocomplete
                    loading={loading}
                    sx={{
                      minWidth: "200px",
                    }}
                    multiple
                    value={categories}
                    onChange={(event, value) => {
                      setSelectedCategories?.(value);
                    }}
                    size="small"
                    id="multiple-limit-tags"
                    options={categoryOption}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        placeholder="search..."
                      />
                    )}
                  />

                  <Autocomplete
                    sx={{ minWidth: "200px" }}
                    multiple
                    size="small"
                    id="multiple-limit-tags"
                    value={priceRange}
                    onChange={(event, value) => {
                      setSelectedPriceRanges?.(value);
                    }}
                    options={PRICE_RANGES}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Price Range"
                        placeholder="search..."
                      />
                    )}
                  />
                </Box>
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
      <Tooltip title="Filters">
        <ToolbarButton
          color="default"
          onClick={handleClick(isMobile ? "bottom-end" : "left-start")}
        >
          <Badge
            badgeContent={categories?.length || priceRange?.length}
            color="primary"
            variant="dot"
          >
            <FilterListIcon fontSize="small" />
          </Badge>
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
}
