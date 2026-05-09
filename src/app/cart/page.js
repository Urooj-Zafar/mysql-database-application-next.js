"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState("");

  const fetchCart = async (id) => {
    const res = await fetch(`/api/cart?user_id=${id}`);
    const data = await res.json();

    if (data.success) {
      setCart(data.cart);
    }
  };

  useEffect(() => {
    // default test user
    const defaultUser = 1;
    setUserId(defaultUser);
    fetchCart(defaultUser);
  }, []);

  const handleCreateCart = async () => {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId })
    });

    const data = await res.json();

    if (data.success) {
      fetchCart(userId);
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-10">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold mb-8">
        Cart Management
      </h1>

      {/* ACTION BOX */}
      <div className="bg-white p-6 rounded-2xl mb-8
                      shadow-[0_10px_30px_rgba(0,0,0,0.06)]">

        <div className="flex gap-4 items-center">

          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
            className="p-3 rounded-xl bg-gray-50 outline-none
                       shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]"
          />

          <button
            onClick={handleCreateCart}
            className="bg-black text-white px-5 py-3 rounded-xl
                       hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                       transition"
          >
            Create Cart
          </button>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl p-6
                      shadow-[0_10px_30px_rgba(0,0,0,0.06)]">

        <h2 className="text-xl font-semibold mb-4">
          Cart Records
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">No cart records found</p>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="p-3">Cart ID</th>
                  <th className="p-3">User ID</th>
                  <th className="p-3">Created At</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((c) => (
                  <tr key={c.cart_id} className="border-b hover:bg-gray-50">

                    <td className="p-3">{c.cart_id}</td>
                    <td className="p-3">{c.user_id}</td>
                    <td className="p-3">{c.created_at}</td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}