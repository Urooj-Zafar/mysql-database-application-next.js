"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    categories: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.replace("/login");
    }
  }, [router]);

  const fetchStats = async () => {
    try {
      const [u, p, c, o] = await Promise.all([
        fetch("/api/auth/users").then((r) => r.json()),
        fetch("/api/catalog/products").then((r) => r.json()),
        fetch("/api/catalog/categories").then((r) => r.json()),
        fetch("/api/orders").then((r) => r.json()),
      ]);

      setStats({
        users: u.users?.length || 0,
        products: p.products?.length || 0,
        categories: c.categories?.length || 0,
        orders: o.orders?.length || 0,
        revenue:
          o.orders?.reduce(
            (sum, order) => sum + Number(order.total_amount),
            0
          ) || 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.replace("/login");
  };

  const nav = [
    {
      title: "Main",
      links: [
        { label: "Users", href: "/users" },
        { label: "Categories", href: "/categories" },
        { label: "Products", href: "/product" },
        { label: "Orders", href: "/orders" },
      ],
    },
    {
      title: "Commerce",
      links: [
        { label: "Cart", href: "/cart" },
        { label: "Order Items", href: "/orderitem" },
        { label: "Cart Items", href: "/cartitem" },
      ],
    },
    {
      title: "System",
      links: [
        { label: "Payment", href: "/payment" },
        { label: "Shipment", href: "/shipment" },
        { label: "Reviews", href: "/review" },
        { label: "Address", href: "/address" },
      ],
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900">
  
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-black text-white p-3 rounded-full shadow-lg"
      >
        ☰
      </button>

      <aside className="hidden lg:block w-72 h-screen overflow-y-auto no-scrollbar bg-black text-white p-6 shadow-2xl">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

        {nav.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="text-xs font-bold uppercase mb-3 tracking-widest">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white hover:text-black transition"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </aside>

      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-black text-white p-6 z-40
          transform transition-transform duration-300 lg:hidden no-scrollbar
          ${open ? "translate-x-0" : "-translate-x-full"}
          overflow-y-auto
        `}
      >
        <div className="flex justify-end mb-4">
          <button onClick={() => setOpen(false)} className="text-xl">
            ✕
          </button>
        </div>

        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

        {nav.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="text-xs font-bold uppercase mb-3 tracking-widest">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white hover:text-black transition"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        ))}

        <div className="pb-10" />
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto no-scrollbar">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold">Dashboard</h2>
            <p className="text-gray-500 mt-1">
              Overview of system performance
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-black text-white hover:scale-105 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Users" value={stats.users} />
          <StatCard title="Products" value={stats.products} />
          <StatCard title="Categories" value={stats.categories} />
          <StatCard title="Orders" value={stats.orders} />
        </div>

        <div className="mt-8">
          <div className="bg-white text-black p-8 rounded-2xl shadow-2xl">
            <p className="text-sm opacity-70">Revenue</p>
            <h3 className="text-4xl font-bold mt-2">
              $ {stats.revenue}
            </h3>
          </div>
        </div>

      </main>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}