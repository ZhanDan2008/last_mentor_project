import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../contexts/AuthContextProvder";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    password_confirm: "",
  });

  const { handleRegister, error } = useAuth();

  useEffect(() => {
    console.log(error, "error");
  }, [error]);

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
    <div>
      <form onSubmit={handleSubmit} className="w-fit m-auto">
        <h2 className="text-center font-semibold text-xl mt-8">Register</h2>
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
      </form>
    </div>
  );
};

export default Register;
