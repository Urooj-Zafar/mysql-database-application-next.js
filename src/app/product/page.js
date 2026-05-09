"use client";

import { useEffect, useState } from "react";
import ProductForm from "./productForm";
import ProductCard from "./productCard";

export default function ProductPage() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("/api/catalog/products");
    const data = await res.json();

    if (data.success) setProducts(data.products);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/catalog/categories");
    const data = await res.json();

    if (data.success) setCategories(data.categories);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black p-10">

      <h1 className="text-4xl font-extrabold text-center mb-8">
        Products
      </h1>

      <ProductForm
        categories={categories}
        onSuccess={fetchProducts}
      />

      <div className="grid md:grid-cols-3 gap-5 mt-10">

        {products.map(p => (
          <ProductCard
            key={p.product_id}
            product={p}
          />
        ))}

      </div>

    </div>
  );
}