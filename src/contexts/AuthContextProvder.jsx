import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { API } from "../helpers/consts";

const authContext = createContext();

export const useAuth = () => useContext(authContext);

const AuthContextProvder = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [error, setError] = useState("");
  async function handleRegister(formData, navigate) {
    try {
      const res = await axios.post(`${API}account/register/`, formData);
      console.log(res);
      setError("");
      navigate("/");
    } catch (err) {
      alert(Object.values(err.response.data).flat(2)[0]);
      setError(Object.values(err.response.data).flat(2)[0]);
    }
  }
  return (
    <authContext.Provider
      value={{
        handleRegister,
        error,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvder;
