"use client";

import { useState } from "react";

export default function ProductForm({ categories, onSuccess }) {

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {

      setForm({
        name: "",
        price: "",
        stock: "",
        category_id: ""
      });

      onSuccess();

    } else {
      alert(data.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white p-8 rounded-2xl mx-auto
                 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
    >

      <h2 className="text-3xl font-bold text-center mb-8">
        Add Product
      </h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="PRODUCT NAME"
        className="w-full p-3 rounded-xl bg-gray-50 outline-none
                   shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
                   focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
      />

      <div className="grid md:grid-cols-2 gap-4">

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="PRICE"
          className="w-full p-3 rounded-xl bg-gray-50 outline-none
                     shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
                     focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
        />

        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="STOCK"
          className="w-full p-3 rounded-xl bg-gray-50 outline-none
                     shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
                     focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
        />

      </div>

      <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-gray-50 outline-none
                   shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
                   focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
      >
        <option value="">
          SELECT CATEGORY
        </option>

        {categories.map((c) => (
          <option
            key={c.category_id}
            value={c.category_id}
          >
            {c.category_name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-black text-white p-3 rounded-xl
                   hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                   transition"
      >
        Add Product
      </button>

    </form>
  );
}