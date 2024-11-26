import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

// Header component definition
const Header: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          User Management
        </Typography>
        <NavLink to="/createuser" end className={({ isActive }) => (isActive ? "navButton active" : "navButton")}>
          <Button color="inherit">Create User</Button>
        </NavLink>
        <NavLink to="/userlist" end className={({ isActive }) => (isActive ? "navButton active" : "navButton")}>
          <Button color="inherit" sx={{ marginRight: 2 }}>
            User List
          </Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
