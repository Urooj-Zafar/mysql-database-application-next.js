"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const fetchUsers = async () => {
    const res = await fetch("/api/auth/users");
    const data = await res.json();

    if (data.success) setUsers(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      setForm({ name: "", email: "", password: "", phone: "" });
      fetchUsers();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black px-6 py-10">

      <h1 className="text-4xl font-extrabold text-center mb-10">
        Users Management
      </h1>

  
      <div className="flex justify-center mb-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-2xl space-y-4
                     shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
        >
            <h2 className="text-3xl font-bold text-center">
            Add User
          </h2>

          {["name", "email", "password", "phone"].map((field) => (
            <input
              key={field}
              name={field}
              type={field === "password" ? "password" : "text"}
              placeholder={field.toUpperCase()}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-50 outline-none
                         shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
                         focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
            />
          ))}

          <button className="w-full bg-black text-white p-3 rounded-xl
                             hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                             transition">
            Add User
          </button>

        </form>

      </div>


      <div className="grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                xl:grid-cols-4 
                gap-6 
                w-full">

        {users.map((u) => (
            <div
            key={u.user_id}
            className="
                bg-white
                p-5
                rounded-2xl
                flex
                flex-col
                gap-2
                shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                transition
            "
            >

  <p><span className="font-semibold">ID:</span> {u.user_id}</p>

  <p><span className="font-semibold">Name:</span> {u.name}</p>

  <p className="break-all">
    <span className="font-semibold">Email:</span> {u.email}
  </p>

  <p>
    <span className="font-semibold">Phone:</span> {u.phone}
  </p>

  <p className="break-all">
    <span className="font-semibold">Password:</span> {u.password}
  </p>

  <span
    className="
      mt-2
      text-xs
      w-fit
      px-3
      py-1
      bg-black
      text-white
      rounded-full
    "
  >
    {u.role}
  </span>

</div>
        ))}

      </div>

    </div>
  );
}