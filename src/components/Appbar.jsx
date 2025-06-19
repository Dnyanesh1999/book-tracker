import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { MenuBook, ShoppingBag } from "@mui/icons-material";
import { useContext } from "react";
import { BookContext } from "../contexts/BookContext.jsx";

const navButtonStyle = (theme, active) => ({
  fontSize: "18px",
  fontWeight: 500,
  color: theme.palette.primary.contrastText,
  borderBottom: active
    ? `2px solid ${theme.palette.primary.contrastText}`
    : "none",
  borderRadius: 0,
  "&:hover": {
    borderBottom: `2px solid ${theme.palette.primary.contrastText}`,
  },
});

const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const { state } = useContext(BookContext);
  const cartCount = state.cart ? state.cart.length : 0;
  return (
    <Box flexGrow={0}>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.primary.main, p: 1 }}
      >
        <Toolbar>
          <MenuBook sx={{ width: "42px", height: "42px", mr: 2 }} />
          <Typography variant="h4" flexGrow={1} noWrap>
            BOOK TRACKER
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={navButtonStyle(theme, location.pathname === "/")}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/favorites"
              sx={navButtonStyle(theme, location.pathname === "/favorites")}
            >
              Favorites
            </Button>

            <IconButton
              component={Link}
              to="/cart"
              sx={{
                borderBottom:
                  location.pathname === "/cart"
                    ? `2px solid ${theme.palette.primary.contrastText}`
                    : "none",
                borderRadius: 0,
                transition: "border-bottom 0.2s",
                "&:hover": {
                  borderBottom: `2px solid ${theme.palette.primary.contrastText}`,
                },
              }}
            >
              <Badge badgeContent={cartCount} color="error">
                <ShoppingBag sx={{ color: "#fff" }} />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
