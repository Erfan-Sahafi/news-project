"use client";
import Cookies from "js-cookie";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function EditNewsForm({ news, isOpen, closeModal }) {
  const [formData, setFormData] = useState({
    newsTitle: news.newsTitle,
    newsClass: news.newsClass,
    newsBody: news.newsBody,
    viewCounter: news.viewCounter,
    cover: news.cover,
  });
  if (!isOpen) return null;
  const isFormValid = formData.newsTitle && formData.cover;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("newsTitle", formData.newsTitle);
    data.append("newsClass", formData.newsClass);
    data.append("viewCounter", formData.viewCounter);
    data.append("newsBody", formData.newsBody);
    data.append("cover", formData.image);
    const userToken = Cookies.get("token");

    try {
      const response = await fetch(
        `http://localhost:8000/v1/news/${news._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Error uploading data");
      }

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "news Updated successful.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            setFormData({
              newsTitle: "",
              newsBody: "",
              newsClass: "",
              viewCounter: 0,
              cover: null,
            });
          }
        });
      }
    } catch (error) {
      Swal.fire("Failed to upload data.", "error");
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Form Modal</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="newsTitle"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                News Title
              </label>
              <input
                type="text"
                name="newsTitle"
                id="title"
                value={formData.newsTitle}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                required={true}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="newsClass"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                News Class
              </label>
              <select
                name="newsClass"
                id="newsClass"
                value={formData.newsClass}
                onChange={handleChange}
                required={true}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              >
                <option value="-1">Select News Class</option>
                <option value="sport">Sport</option>
                <option value="technology">Technology</option>
                <option value="health">Health</option>
                <option value="politics">Politics</option>
                <option value="economics">Economics</option>
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="viewCounter"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                view Counter
              </label>
              <input
                type="number"
                name="viewCounter"
                value={formData.viewCounter}
                onChange={handleChange}
                id="viewCounter"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="image"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                News Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full "
                required={true}
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="newsBody"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                News Body
              </label>
              <textarea
                id="newsBody"
                rows="6"
                name="newsBody"
                value={formData.newsBody}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-4"
                required={true}
              ></textarea>
            </div>
            <div className="flex mt-3 justify-end space-x-4">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
