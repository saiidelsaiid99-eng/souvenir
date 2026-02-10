"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Add Product", href: "/admin/add-product" },
    { name: "Add Gift", href: "/admin/add-gift" },
    { name: "Add Custom Gift", href: "/admin/add-custom-gift" },
    { name: "Admin Dashboard", href: "/admin" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 border-r border-cyan-500/20">
      <h2 className="text-2xl font-bold mb-8 text-white">Admin Panel</h2>
      <nav className="flex flex-col space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 hover:text-white transition-all ${
              pathname === link.href 
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30" 
                : "text-slate-300 hover:scale-[1.02] border border-cyan-500/20"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}