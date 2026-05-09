"use client";

import { useEffect, useState } from "react";

export default function AddressPage() {
  const [form, setForm] = useState({
    user_id: "",
    city: "",
    street: "",
    postal_code: "",
    country: ""
  });

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // FETCH DATA
  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/address");
      const data = await res.json();

      if (data.success) {
        setAddresses(data.addresses);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      setForm({
        user_id: "",
        city: "",
        street: "",
        postal_code: "",
        country: ""
      });

      fetchAddresses();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-10">

      {/* TITLE */}
      <h1 className="text-3xl font-semibold mb-8">
        Address Management
      </h1>

      {/* FORM */}
      <div className="flex justify-center mb-10">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-2xl space-y-4
                     shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
        >

          <h2 className="text-xl font-semibold text-center">
            Add Address
          </h2>

          {["user_id", "city", "street", "postal_code", "country"].map(
            (field) => (
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
            )
          )}

          <button
            className="w-full bg-black text-white p-3 rounded-xl
                       hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                       transition"
          >
            Save Address
          </button>

        </form>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl p-6
                      shadow-[0_10px_30px_rgba(0,0,0,0.06)]">

        <h2 className="text-xl font-semibold mb-4">
          Address Records
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : addresses.length === 0 ? (
          <p className="text-gray-500">No records found</p>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="p-3">ID</th>
                  <th className="p-3">User ID</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Street</th>
                  <th className="p-3">Postal Code</th>
                  <th className="p-3">Country</th>
                </tr>
              </thead>

              <tbody>
                {addresses.map((a) => (
                  <tr key={a.address_id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{a.address_id}</td>
                    <td className="p-3">{a.user_id}</td>
                    <td className="p-3">{a.city}</td>
                    <td className="p-3">{a.street}</td>
                    <td className="p-3">{a.postal_code}</td>
                    <td className="p-3">{a.country}</td>
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