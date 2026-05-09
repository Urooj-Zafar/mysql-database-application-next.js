"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      alert("Account created");
      router.push("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black flex items-center justify-center px-6">

      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white p-8 rounded-2xl space-y-4
                   shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
      >

        <h1 className="text-3xl font-bold text-center mb-8">
          Sign Up
        </h1>

        <input
          name="name"
          placeholder="NAME"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-gray-50 outline-none
                     shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
                     focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
        />

        <input
          name="email"
          placeholder="EMAIL"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-gray-50 outline-none
                     shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
                     focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
        />

        <input
          name="password"
          type="password"
          placeholder="PASSWORD"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-gray-50 outline-none
                     shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
                     focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
        />

        <input
          name="phone"
          placeholder="PHONE"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-gray-50 outline-none
                     shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]
                     focus:shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-xl
                     hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                     transition"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="underline font-medium">
            Login
          </a>
        </p>

      </form>

    </div>
  );
}