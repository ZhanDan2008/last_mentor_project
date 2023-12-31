import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useAuth } from "../contexts/AuthContextProvder";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    password_confirm: "",
  });

  const { handleRegister, error } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !user.email.trim() ||
      !user.password.trim() ||
      !user.password_confirm.trim()
    ) {
      alert("some inputs are empty!");
      return;
    }

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("password_confirm", user.password_confirm);
    handleRegister(formData, navigate);
  };

  return (
    <Box
      onSubmit={handleSubmit}
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
      <h2 className="text-center font-semibold text-xl">Register</h2>
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
      <TextField
        id="outlined-basic"
        name="password_confirm"
        label="Password confirmation"
        variant="outlined"
        onChange={handleChange}
      />
      <Button variant="contained" type="submit">
        Sign up
      </Button>
    </Box>
  );
};

export default Register;
