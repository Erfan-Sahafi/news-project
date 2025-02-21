"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useUser } from "../context/UserContext";

export default function Login() {
  const { setUser } = useUser();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required.")
      .email("The email entered is not valid."),
    password: yup
      .string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters long."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:8000/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      Cookies.set("token", result.accessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        expires: 30,
        sameSite: "Strict",
      });
      Cookies.set(
        "user",
        JSON.stringify({
          username: result.user.username,
          role: result.user.role,
        }),
        { expires: 30, sameSite: "Strict" }
      );
      setUser({ username: result.user.username, role: result.user.role });

      redirect("/");
    } else {
      console.log("Login error.", "error");
    }
  };

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="w-[350px] md:w-[400px]">
        <div className="bg-white shadow-md border-solid-2 border-primary rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600 text-xs md:text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-600 text-xs md:text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-shade_2 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <Link
                href="/signup"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
