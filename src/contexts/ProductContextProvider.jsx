import React, { createContext, useContext, useReducer } from "react";
import { API } from "../helpers/consts";
import axios from "axios";

const productContext = createContext();
export const useProducts = () => {
  const context = productContext;
  if (!context) throw new Error("You should use provide this app");
  return useContext(context);
};

const INIT_STATE = {
  products: [],
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
}

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  async function getProducts() {
    try {
      const res = await axios.get(`${API}products/`);
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data.results,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <productContext.Provider value={{ getProducts, products: state.products }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
