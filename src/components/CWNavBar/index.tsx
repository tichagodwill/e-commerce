import { useState, MouseEvent } from "react";
import { Box, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import CWCartWidget from "../CWCartWidget";
import CWSearchBar from "../CWSearchBar";
import CWUserMenu from "../CWUserMenu";
import { AppName, IconsBox, StyledAppBar, StyledLink } from "./CWNavBar.styled";
import CWCartDrawer from "../CWCartDrawer";
import { Link } from "react-router-dom";

const CWNavBar = () => {
  const base_url = import.meta.env.VITE_BASE_URL;

  const [open, setOpen] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "user-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <p>Carrito</p>
        <CWCartWidget open={false} setOpen={() => setOpen(!open)} />
      </MenuItem>
      <MenuItem>
        <Link to={`${base_url}/profile`}>Profile</Link>
        <CWUserMenu handleMobileMenuClose={() => {}} />
      </MenuItem>
    </Menu>
  );

  const categories = ["clothes", "electronics", "toys", "home"];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <StyledLink to={`${base_url}/`}>
            <AppName
              noWrap
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              CA.FE buy!
            </AppName>
          </StyledLink>
          {categories.map((category) => (
            <StyledLink key={category} to={`${base_url}/category/${category}`}>
              {category}
            </StyledLink>
          ))}
          <CWSearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <IconsBox sx={{ display: { xs: "none", md: "flex" } }}>
            <CWUserMenu handleMobileMenuClose={handleMobileMenuClose} />
            <CWCartWidget open={open} setOpen={setOpen} />
          </IconsBox>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
      {renderMobileMenu}
      {open && <CWCartDrawer open={open} setOpen={setOpen} />}
    </Box>
  );
};

export default CWNavBar;
