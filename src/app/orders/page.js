"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();

    if (data.success) setOrders(data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Orders
      </h1>

      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6">

        {orders.map((o) => (
          <div
            key={o.order_id}
            className="bg-white rounded-2xl p-6 h-full flex flex-col
                       shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                       hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]
                       transition duration-300"
          >

            <div className="flex items-start justify-between gap-3 mb-6">

              <div className="min-w-0">

                <h2 className="text-2xl font-bold truncate">
                  Order #{o.order_id}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  User ID: {o.user_id}
                </p>

              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full whitespace-nowrap
                  ${
                    o.status === "completed"
                      ? "bg-black text-white"
                      : o.status === "pending"
                      ? "bg-gray-200 text-black"
                      : "bg-red-100 text-red-600"
                  }`}
              >
                {o.status}
              </span>

            </div>

            <div className="space-y-4 flex-1">

              <div
                className="bg-gray-50 rounded-xl p-4 h-[95px]
                           flex flex-col justify-center
                           shadow-[inset_0_2px_6px_rgba(0,0,0,0.04)]"
              >

                <p className="text-sm text-gray-500 mb-1">
                  Total Amount
                </p>

                <h3 className="text-3xl font-bold truncate">
                  ${o.total_amount}
                </h3>

              </div>

              <div
                className="bg-gray-50 rounded-xl p-4 h-[95px]
                           flex flex-col justify-center
                           shadow-[inset_0_2px_6px_rgba(0,0,0,0.04)]"
              >

                <p className="text-sm text-gray-500 mb-1">
                  Status
                </p>

                <h3 className="text-xl font-bold capitalize truncate">
                  {o.status}
                </h3>

              </div>

              <div
                className="bg-gray-50 rounded-xl p-4
                           shadow-[inset_0_2px_6px_rgba(0,0,0,0.04)]"
              >

                <p className="text-sm text-gray-500 mb-2">
                  Order Information
                </p>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Order ID
                    </span>

                    <span className="font-medium truncate">
                      #{o.order_id}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      User ID
                    </span>

                    <span className="font-medium truncate">
                      {o.user_id}
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}