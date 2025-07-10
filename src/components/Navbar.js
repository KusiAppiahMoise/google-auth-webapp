import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Divider,
  Grow,
  SwipeableDrawer,
  useMediaQuery,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down("md"));

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
    setDrawerOpen(false);
  };

  const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: "100%",
          backgroundColor: {
            xs: "rgba(255, 255, 255, 0.95)",
            md: "rgba(255, 255, 255, 0.85)",
          },
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e0e0e0",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          overflow: "visible",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: "1440px",
            width: "100%",
            mx: "auto",
            px: { xs: 1.5, sm: 2, md: 4 },
            minHeight: { xs: 56, sm: 64 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#1a1a1a",
              fontWeight: 500,
              fontFamily: "Inter, sans-serif",
              fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.5rem" },
              maxWidth: { xs: "60%", sm: "100%" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Google Auth WebApp
          </Typography>

          {!isCompact ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 1.5 } }}>
              {user ? (
                <>
                  <IconButton onClick={handleMenuOpen} sx={{ p: 0, mr: 7 }}>
                    <Avatar
                      alt={user.name}
                      src={user.picture}
                      sx={{
                        width: { xs: 32, sm: 36, md: 40 },
                        height: { xs: 32, sm: 36, md: 40 },
                        border: "2px solid #007aff",
                        backgroundColor: user.picture ? "transparent" : "#007aff",
                        color: user.picture ? "inherit" : "#fff",
                        fontWeight: 600,
                        fontSize: "1rem",
                      }}
                    >
                      {!user.picture && user.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>

                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{
                    elevation: 8,
                    sx: {
                      borderRadius: 3,
                      mt: 1,
                      minWidth: 260,
                      p: 2,
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    mb={1}
                  >
                    <Avatar
                      src={user.picture}
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: user.picture ? "transparent" : "#007aff",
                        color: user.picture ? "inherit" : "#fff",
                        fontWeight: 600,
                        fontSize: "1.3rem",
                        mb: 1,
                      }}
                    >
                      {!user.picture && user.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {user.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ maxWidth: 200, wordBreak: "break-word" }}
                    >
                      {user.email}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/account");
                    }}
                    sx={{
                      justifyContent: "center",
                      fontWeight: 500,
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Manage My Account
                  </MenuItem>

                  <Divider sx={{ my: 1.5 }} />

                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      justifyContent: "center",
                      fontWeight: 500,
                      color: "error.main",
                      "&:hover": {
                        backgroundColor: "rgba(255, 0, 0, 0.05)",
                      },
                    }}
                  >
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
                </>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  startIcon={<AccountCircle />}
                  sx={{
                    borderRadius: 3,
                    mr: 5,
                    px: { xs: 1.5, sm: 2 },
                    py: { xs: 0.8, sm: 1.2 },
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    color: "#007aff",
                    border: "1px solid #007aff",
                    fontWeight: 500,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#007aff",
                      color: "#fff",
                    },
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
              <IconButton
                onClick={() => setDrawerOpen((prev) => !prev)}
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                  p: 1.2,
                  mr: { xs: 3, sm: 3 },
                  color: "#1a1a1a",
                  border: "1px solid #ccc",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <MenuIcon fontSize="medium" />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ height: { xs: "56px", sm: "64px" } }} />

      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <Box
          sx={{
            width: 280,
            pt: 5,
            px: 3,
            transition: "transform 0.3s ease-in-out",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {user ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt: 5 }}>
                <Avatar
                  src={user.picture}
                  sx={{
                    mr: 2,
                    backgroundColor: user.picture ? "transparent" : "#007aff",
                    color: user.picture ? "inherit" : "#fff",
                    fontWeight: 600,
                  }}
                >
                  {!user.picture && user.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Button
                variant="outlined"
                fullWidth
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  borderRadius: 3,
                  py: 1.2,
                  fontWeight: 500,
                  textTransform: "none",
                  color: "#1a1a1a",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Box sx={{ mt: 6 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<AccountCircle />}
                component={Link}
                to="/login"
                sx={{
                  borderRadius: 3,
                  py: 1.4,
                  backgroundColor: "#007aff",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#006ae6",
                  },
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default Navbar;
