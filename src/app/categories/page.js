"use client";

import { useEffect, useState } from "react";

export default function CategoryPage() {

  const [categories, setCategories] = useState([]);
  const [category_name, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    const res = await fetch("/api/catalog/categories");
    const data = await res.json();

    if (data.success) {
      setCategories(data.categories);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/catalog/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ category_name })
    });

    const data = await res.json();

    setLoading(false);
    setCategoryName("");

    if (data.success) {
      fetchCategories();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Category Management
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl mx-auto mb-12 bg-white p-8 rounded-2xl
                   space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
      >

        <h2 className="text-2xl font-bold text-center mb-6">
          Add Category
        </h2>

        <input
          type="text"
          value={category_name}
          placeholder="CATEGORY NAME"
          className="w-full p-3 rounded-xl bg-gray-50 outline-none
                     shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
                     focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-xl
                     hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                     transition disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>

      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {categories.map((cat) => (
          <div
            key={cat.category_id}
            className="bg-white rounded-2xl p-6
                       shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                       hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]
                       transition"
          >

            <div className="flex items-center justify-between">

              <h3 className="text-xl font-bold truncate">
                {cat.category_name}
              </h3>

              <span className="text-xs bg-black text-white px-3 py-1 rounded-full">
                #{cat.category_id}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}