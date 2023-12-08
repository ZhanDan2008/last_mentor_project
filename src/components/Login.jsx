import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContextProvder";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { error, setError, handleLogin } = useAuth();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setError("");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
    console.log(loginForm);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      alert("some inputs are empty!");
      return;
    }
    const formData = new FormData();
    formData.append("email", loginForm.email);
    formData.append("password", loginForm.password);
    handleLogin(formData, loginForm.email, navigate);
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
      <h2 className="text-center font-semibold text-xl">Login</h2>
      {error && (
        <span className="text-center text-red-700 font-bold text-xl">
          {error}
        </span>
      )}
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
