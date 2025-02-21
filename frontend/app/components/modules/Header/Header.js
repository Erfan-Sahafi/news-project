"use client";
import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Button from "../Button/Button";
import { useUser } from "@/app/context/UserContext";

export default function Header() {
  const { user, setUser } = useUser();

  const logoutUserHandler = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <header>
      <div className="sticky top-0 text-gray_10 text-md md:text-xl bg-white flex items-center justify-between shadow-md h-14 lg:h-20 md:px-8 px-4 py-[26px]">
        <div className="flex items-center w-full lg:justify-normal">
          <div className="flex-1 text-md font-bold md:text-2xl lg:flex-none">
            <Link href={"/"}>
              <span className="p-1 md:p-2 mr-1 rounded-sm bg-primary text-white">
                News
              </span>
              Point
            </Link>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {user ? (
            <>
              <span className="uppercase border-b-2 border-solid font-bold border-tint_6">
                {user.username}
              </span>
              <Button onClick={logoutUserHandler} type={"small"}>
                Log out
              </Button>
              {user.role === "ADMIN" && (
                <Link href={"/paneladmin"}>
                  <Button type={"small"}>
                    Add News
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link className="" href={"/login"}>
                Login
              </Link>
              <Link href={"/signup"}>
                <Button type={"small"}>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
