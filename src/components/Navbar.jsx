import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvder";
import { useProducts } from "../contexts/ProductContextProvider";

function Navbar() {
  const [account, setAccount] = React.useState(null);
  const [product, setProduct] = React.useState(null);
  const open = Boolean(account);
  const handleClick = (event) => {
    setAccount(event.currentTarget);
  };
  const handleClose = () => {
    setAccount(null);
  };

  const openProduct = Boolean(product);
  const handleProductClick = (event) => {
    setProduct(event.currentTarget);
  };
  const handleProductClose = () => {
    setProduct(null);
  };

  const { currentUser, setCurrentUser, handleLogout, checkAuth } = useAuth();

  React.useEffect(() => {
    checkAuth();
    setCurrentUser(localStorage.getItem("email"));
  }, []);

  React.useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div className="bg-purple-500 text-white sticky top-0 z-20">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="success"
      >
        Account
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={account}
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
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleProductClick}
        color="success"
      >
        Product
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={product}
        open={openProduct}
        onClose={handleProductClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleProductClose}>
          <NavLink to={"/"}>Products list</NavLink>
        </MenuItem>
        <MenuItem onClick={handleProductClose}>
          <NavLink to={"/add"}>Create product</NavLink>
        </MenuItem>
      </Menu>
      <div>{currentUser ? currentUser : "No active user"}</div>
    </div>
  );
}

export default Navbar;
