import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductContextProvider";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const {
    getCategories,
    categories,
    getOneProduct,
    oneProduct,
    saveEditedProduct,
  } = useProducts();
  const [newProductObj, setNewProductObj] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
    image: null,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
    getOneProduct(id);
  }, []);

  useEffect(() => {
    if (oneProduct) {
      console.log(oneProduct);
      setNewProductObj({
        title: oneProduct.title,
        description: oneProduct.description,
        price: oneProduct.price,
        category: oneProduct.category.id,
        // image: oneProduct.image,
      });
    }
  }, [oneProduct]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProductObj({ ...newProductObj, [name]: files[0] });
    } else {
      setNewProductObj({ ...newProductObj, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedProduct = new FormData();
    updatedProduct.append("title", newProductObj.title);
    updatedProduct.append("description", newProductObj.description);
    updatedProduct.append("price", newProductObj.price);
    updatedProduct.append("category", newProductObj.category);
    if (newProductObj.image) {
      updatedProduct.append("image", newProductObj.image);
    }

    saveEditedProduct(id, newProductObj, navigate);
  };

  return (
    <form
      className="w-fit m-auto flex flex-col gap-7 mt-2"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center text-xl font-semibold">Update product</h2>
      <TextField
        label="Title"
        variant="outlined"
        name="title"
        value={newProductObj.title}
        onChange={handleChange}
      />
      <TextField
        label="Description"
        variant="outlined"
        name="description"
        value={newProductObj.description}
        onChange={handleChange}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={newProductObj.price}
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
        Save changes
      </Button>
    </form>
  );
};

export default EditProduct;
