import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContextProvder";

const Login = () => {
  const { error } = useAuth();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
    console.log(loginForm);
  };

  return (
    <Box
      //   onSubmit={handleSubmit}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30ch" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "25%",
        margin: "auto",
        marginTop: "100px",
        border: "3px solid #1976D2",
        borderRadius: "20px",
        gap: "10px",
        padding: "30px 5px",
      }}
      noValidate
      autoComplete="off"
    >
      <h2 className="text-center font-semibold text-xl">Login</h2>
      {error && <span>{error}</span>}
      <TextField
        id="outlined-basic"
        name="email"
        label="Email"
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        id="outlined-basic"
        name="password"
        label="Password"
        variant="outlined"
        onChange={handleChange}
      />
      <Button variant="contained" type="submit">
        Sign in
      </Button>
    </Box>
  );
};

export default Login;
