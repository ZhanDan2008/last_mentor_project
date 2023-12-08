import React, { useEffect } from "react";
import { useProducts } from "../contexts/ProductContextProvider";

const ProductList = () => {
  const { getProducts, products } = useProducts();
  useEffect(() => {
    getProducts();
  }, []);

  console.log(products, "products");
  return <div>ProductList</div>;
};

export default ProductList;
