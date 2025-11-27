"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const groups = [
  {
    title: "Products",
    items: ["ChatGPT", "API", "GPT Store", "Teams", "Enterprise"],
  },
  {
    title: "Research",
    items: ["Overview", "Publications", "Safety"],
  },
  {
    title: "Company",
    items: ["About", "Careers", "Newsroom", "Blog"],
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 border-r bg-white px-7 py-10 flex-col gap-10">
        <div className="text-2xl font-semibold">OpenAI</div>

        {groups.map((group) => (
          <div key={group.title}>
            <h4 className="text-xs uppercase text-gray-400 mb-3 tracking-wider">{group.title}</h4>

            <div className="flex flex-col gap-2">
              {group.items.map((item) => (
                <a key={item} href="#" className="text-gray-700 hover:text-black transition">
                  {item}
                </a>
              ))}
            </div>
          </div>
        ))}
      </aside>

      {/* Mobile hamburger */}
      <button className="absolute lg:hidden top-4 left-4 z-50" onClick={() => setOpen(true)}>
        <Menu size={28} />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-7 py-8 border-b">
          <div className="text-xl font-semibold">OpenAI</div>
          <button onClick={() => setOpen(false)}>
            <X size={26} />
          </button>
        </div>

        <div className="px-7 py-6 flex flex-col gap-8">
          {groups.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs uppercase text-gray-400 mb-2 tracking-wider">{group.title}</h4>

              <div className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <a key={item} href="#" className="text-gray-700 hover:text-black transition">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
