import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvder";
import { useProducts } from "../contexts/ProductContextProvider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { currentUser, setCurrentUser, handleLogout, checkAuth } = useAuth();

  React.useEffect(() => {
    checkAuth();
    setCurrentUser(localStorage.getItem("email"));
  }, []);

  React.useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    
      <Divider />
      <List>
        {["Products"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>        
              <Link to={"/"}>Products</Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <>
      <div className="bg-purple-500 text-white flex flex-row justify-between p-4  ">
        <div className="bg-purple-500 text-white flex flex-row justify-between">
          <div>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}><MenuIcon color="action"/></Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </div>
          <h1 className="font-bold text-2xl">Fullstack project</h1>
        </div>
        <div className="bg-purple-500 text-white flex flex-row">
          <div className="pt-2">{currentUser ? currentUser : "No active user"}</div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            color="success"
          >
            <AccountCircleIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <NavLink to={"/register"}>Register</NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <NavLink to={"/login"}>Login</NavLink>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
}

export default Navbar;
