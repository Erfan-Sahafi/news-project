import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavbarItem({children,href}) {
  const currentPath = usePathname();

  return (
    <li>
      <Link
        className={`hidden lg:inline-block hover:text-primary ease-in duration-200${
          currentPath === `${children}` &&
          "text-primary border-b-2 border-solid border-primary"
        }`}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}
