import React, { useEffect } from "react";
import { useProducts } from "../contexts/ProductContextProvider";

const ProductList = () => {
  const { getProducts, products } = useProducts();
  useEffect(() => {
    getProducts();
  }, []);

  console.log(products, "products");
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-purple-800 p-6 rounded-lg w-full">
            <img
              className="w-full h-64 object-cover mb-4 rounded"
              src={product.image}
              alt={product.title}
            />
            <p className="text-2xl font-bold mb-2 text-purple-300">
              {product.title}
            </p>
            <p className="text-gray-400 mb-4">{product.description}</p>
            <p className="text-green-500 font-bold text-lg">
              {product.price} USD
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;