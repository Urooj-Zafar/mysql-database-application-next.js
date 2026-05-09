"use client";

import { useEffect, useState } from "react";

export default function OrderItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const order_id = 15;

  const fetchOrderItems = async () => {
    if (!order_id) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/orderitem?order_id=${order_id}`);
      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (data.success) {
        setItems(data.orderItems || []);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error(err);
      setItems([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOrderItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
        Order Items
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">
            No order items found (check order_id or DB data)
          </p>
        ) : (
          <table className="w-full text-left">

            <thead>
              <tr className="border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Product</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Price</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.order_item_id} className="border-b">

                  <td className="p-2">{item.order_item_id}</td>
                  <td className="p-2">{item.product_name}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">{item.price}</td>
                  <td className="p-2">{item.total}</td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}