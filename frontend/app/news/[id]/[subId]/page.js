import Title from "@/app/components/modules/Title/Title";
import Image from "next/image";
import React from "react";

export default async function page({ params }) {
  const { subId } = params;
  
  const res = await fetch(`http://localhost:8000/v1/news/${subId}`, {
    cache: "no-store",
  });
  const { news } = await res.json();
  const createdAt = new Date(news.createdAt);
  const formattedDate = createdAt.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric', 
  });

  return (
    <>
      {news ? (
        <div className="container text-gray-900 flex flex-col gap-5 items-center justify-center mt-8">
          <Title title={news.newsTitle} />
          <Image
            width={800}
            height={600}
            src={`http://localhost:8000/news/covers/${news.cover}`}
            alt=""
            className="w-full h-[250px] md:h-[400px]"
          />
          <p className="text-white bg-primary p-1 rounded-md">
            {news.newsClass}
          </p>
          <p className="text-justify text-sm md:text-md leading-5 md:leading-8 ">
            {news.newsBody}
            <span className="block text-gray-500 text-xs sm:text-sm">Published on:{formattedDate}</span>
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
