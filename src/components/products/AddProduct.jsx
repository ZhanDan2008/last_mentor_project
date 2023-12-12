import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductContextProvider";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { getCategories, categories, addProduct } = useProducts();
  const [newProductObj, setNewProductObj] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
    image: null,
  });

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProductObj({ ...newProductObj, [name]: files[0] });
    } else {
      setNewProductObj({ ...newProductObj, [name]: value });
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newProductObj.title.trim() ||
      !newProductObj.description.trim() ||
      !newProductObj.price.trim() ||
      !newProductObj.category.trim() ||
      !newProductObj.image
    ) {
      alert("Some inputs are empty!");
      return;
    }
    const formData = new FormData();
    formData.append("title", newProductObj.title);
    formData.append("description", newProductObj.description);
    formData.append("price", newProductObj.price);
    formData.append("category", newProductObj.category);
    formData.append("image", newProductObj.image);
    addProduct(formData, navigate);
  };

  return (
    <form
      className="w-fit m-auto flex flex-col gap-7 mt-2"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center text-xl font-semibold">Create product</h2>
      <TextField
        label="Title"
        variant="outlined"
        name="title"
        onChange={handleChange}
      />
      <TextField
        label="Description"
        variant="outlined"
        name="description"
        onChange={handleChange}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        onChange={handleChange}
      />
      <select name="category" onChange={handleChange}>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.title}
          </option>
        ))}
      </select>
      <input
        accept="image/*"
        name="image"
        onChange={handleChange}
        type="file"
      />
      <Button type="submit" variant="contained">
        Add product
      </Button>
    </form>
  );
};

export default AddProduct;
