"use client";

import { useEffect, useState } from "react";

export default function ShipmentPage() {
  const [form, setForm] = useState({
    order_id: "",
    shipment_status: "",
    courier_service: "",
    delivery_date: ""
  });

  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchShipments = async () => {
    setLoading(true);

    const res = await fetch("/api/fullfillment/shipment");
    const data = await res.json();

    if (data.success) {
      setShipments(data.shipments);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/fullfillment/shipment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      setForm({
        order_id: "",
        shipment_status: "",
        courier_service: "",
        delivery_date: ""
      });

      fetchShipments();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-10">

  
      <h1 className="text-4xl font-extrabold text-center mb-8">
        Shipment Management
      </h1>


      <div className="flex justify-center mb-10">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-2xl space-y-4
                     shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
        >

          <h2 className="text-3xl font-bold text-center">
            Add Shipment
          </h2>

          {[
            "order_id",
            "shipment_status",
            "courier_service",
            "delivery_date"
          ].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.toUpperCase()}
              className="w-full p-3 rounded-xl bg-gray-50 outline-none
                         shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
                         focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
            />
          ))}

          <button
            className="w-full bg-black text-white p-3 rounded-xl
                       hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                       transition"
          >
            Save Shipment
          </button>

        </form>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl p-6
                      shadow-[0_10px_30px_rgba(0,0,0,0.06)]">

        <h2 className="text-3xl font-bold text-center mb-4">
          Shipment Records
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : shipments.length === 0 ? (
          <p className="text-gray-500">No shipments found</p>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="p-3">ID</th>
                  <th className="p-3">Order</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Courier</th>
                  <th className="p-3">Ship Date</th>
                  <th className="p-3">Delivery Date</th>
                </tr>
              </thead>

              <tbody>
                {shipments.map((s) => (
                  <tr key={s.shipment_id} className="border-b hover:bg-gray-50">

                    <td className="p-3">{s.shipment_id}</td>
                    <td className="p-3">{s.order_id}</td>

                    <td className="p-3">
                      <span className="px-3 py-1 text-xs rounded-full bg-black text-white">
                        {s.shipment_status}
                      </span>
                    </td>

                    <td className="p-3">{s.courier_service}</td>
                    <td className="p-3">{s.shipment_date}</td>
                    <td className="p-3">{s.delivery_date || "-"}</td>

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