import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Google Auth WebApp
        </Typography>
        {user ? (
          <>
            <IconButton sx={{ p: 0, mr: 2 }}>
              {user.picture ? (
                <Avatar alt={user.name} src={user.picture} />
              ) : (
                <Avatar>
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </Avatar>
              )}
            </IconButton>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </>
        ) : (
          <IconButton color="inherit" component={Link} to="/login">
            <AccountCircle />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;