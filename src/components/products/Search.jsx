import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContextProvider";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { getProducts } = useProducts();
  useEffect(() => {
    setSearchParams({ page: 1, title: search });
    getProducts();
  }, [search]);
  return (
    <div>
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white"
        variant="filled"
        label="Search..."
      />
    </div>
  );
};

export default Search;
