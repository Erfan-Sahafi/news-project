"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import EditNewsForm from "../EditNewsForm/EditNewsForm";

export default function NewsTable() {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsDataEdit, setNewsDataEdit] = useState(null);

  const removeNewsHandler = async (newsID) => {
    Swal.fire({
      title: "Remove News successful.",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      const userToken = Cookies.get("token");
      fetch(`http://localhost:8000/v1/news/${newsID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((res) => {
        res.json();
        fetchData();
      });
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/v1/news");
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();

      setData(result.news);
    } catch (err) {}
  };
  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const openModal = (news) => {
    setIsModalOpen(true);
    setNewsDataEdit(news);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-2">
        <div className="w-full bg-first rounded-md shadow-md shadow-gray-400">
          <div className="relative overflow-x-auto max-h-screen sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs uppercase">
                <tr>
                  <th scope="col" className="px-10 py-3">
                    <span className="">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    newsTitle
                  </th>

                  <th scope="col" className="px-6 py-3">
                    newsClass
                  </th>
                  <th scope="col" className="px-6 py-3">
                    viewCounter
                  </th>
                  <th scope="col" className="px-6 py-3">
                    newsBody
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 ? (
                  data?.map((news) => (
                    <Fragment key={news._id}>
                      <tr className="bg-white border-b">
                        <td className="p-4">
                          <Image
                            width={800}
                            height={600}
                            src={`http://localhost:8000/news/covers/${news.cover}`}
                            className="w-12 md:w-20 max-w-full max-h-full"
                            alt=""
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {news.newsTitle.slice(0, 20) + "..."}
                        </td>

                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {news.newsClass}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {news.viewCounter}
                        </td>
                        <td className="px-6 py-4  font-semibold text-gray-900">
                          {news.newsBody.slice(0, 20) + "..."}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="font-medium text-red-600 mr-4 hover:underline cursor-pointer"
                            onClick={() => removeNewsHandler(news._id)}
                          >
                            Remove
                          </button>
                          <button
                            className="font-medium text-sky-600 hover:underline cursor-pointer"
                            onClick={() => openModal({ ...news })}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    </Fragment>
                  ))
                ) : (
                  <tr>
                    <td>No news available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EditNewsForm
          news={newsDataEdit}
          isOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
