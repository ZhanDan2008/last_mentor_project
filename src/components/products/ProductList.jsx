import React, { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductContextProvider";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const ProductList = () => {
  const { getProducts, products, pages } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  console.log(useSearchParams(), "parms");

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      page: currentPage,
    });
  }, [currentPage]);

  const handleChange = (event, value) => {
    setCurrentPage(value);

    console.log(currentPage);
  };

  console.log(pages, "products");
  return (
    <div>
      {products.map((card) => (
        <div key={card.id}>
          <ProductCard card={card} />
        </div>
      ))}
      <Pagination count={pages} page={currentPage} onChange={handleChange} />
    </div>
  );
};

export default ProductList;
