import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="w-full h-20 bg-gray-200 flex items-center text-2xl font-bold justify-center mt-8">
      <Link href={"/"}>
        <span className="p-1 md:p-2 mr-1 rounded-sm bg-primary text-white">
          News
        </span>
        Point
      </Link>
    </div>
  );
}
