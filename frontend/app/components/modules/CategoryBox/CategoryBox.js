import Link from "next/link";
import React from "react";

export default function CategoryBox({ icon, text }) {
  return (
    <Link href={`/news/${text}`}>
      <div className="py-6 px-6 flex items-center gap-3 bg-slate-200 shadow-xl rounded-md mb-10">
        <div className="text-3xl text-primary">{icon}</div>
        <p className="text-xl text-gray-900 uppercase">{text}</p>
      </div>
    </Link>
  );
}
