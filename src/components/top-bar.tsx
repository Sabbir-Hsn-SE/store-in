"use client";

import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Typography from "@mui/material/Typography";

type TopBarProps = {
  open: boolean;
  handleDrawerOpenClose: () => void;
};

export default function TopBar({ open, handleDrawerOpenClose }: TopBarProps) {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: "none" }}
    >
      <Toolbar variant="dense">
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton
            color="inherit"
            aria-label="open close drawer"
            onClick={handleDrawerOpenClose}
            edge="start"
          >
            {open ? (
              <MenuOpenIcon fontSize="small" />
            ) : (
              <MenuIcon fontSize="small" />
            )}
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            Store.in
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
