"use client";

import { useEffect, useState } from "react";

export default function CartItemPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cartId, setCartId] = useState(16);

  const fetchItems = async (id) => {
    if (!id) return;

    setLoading(true);

    const res = await fetch(`/api/cartitem?cart_id=${id}`);
    const data = await res.json();

    if (data.success) {
      setItems(data.cartItems || []);
    } else {
      setItems([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchItems(cartId);
  }, [cartId]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">Cart Items</h1>

      {/* TABLE */}
      <div className="bg-white p-6 rounded">

        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>No cart items found</p>
        ) : (
          <table className="w-full text-left">

            <thead>
              <tr className="border-b">
                <th>ID</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {items.map((i) => (
                <tr key={i.cart_item_id} className="border-b">

                  <td>{i.cart_item_id}</td>
                  <td>{i.product_name}</td>
                  <td>{i.quantity}</td>
                  <td>{i.price}</td>
                  <td>{i.total}</td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    </div>
  );
}