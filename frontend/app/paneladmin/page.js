"use client";
import React from "react";
import AddNewsForm from "../components/modules/AddNewsForm/AddNewsForm";
import NewsTable from "../components/modules/NewsTable/NewsTable";
import { useUser } from "../context/UserContext";
import { redirect } from "next/navigation";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUser();

  if (!user || user.role !== "ADMIN") {
    redirect('/404')
  }
  return (
    <>
      {user?.role === "ADMIN" && (
        <>
          <NewsTable />
          <div className="bg-white rounded-lg shadow relative m-10">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Add News</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="product-modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <AddNewsForm />
          </div>
        </>
      )}
    </>
  );
}
