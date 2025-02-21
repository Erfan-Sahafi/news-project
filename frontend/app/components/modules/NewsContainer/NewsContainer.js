"use client";
import React, { useEffect, useState } from "react";
import NewsBox from "../NewsBox/NewsBox";
import { usePathname } from "next/navigation";
import Title from "../Title/Title";

export default function NewsContainer({ children }) {
  const [news, setNews] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchHotNews = async () => {
      const response = await fetch("http://localhost:8000/v1/news");
      const data = await response.json();
      const sortedNews = data.news?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNews(sortedNews);
    };
    const fetchNews = async () => {
      const newsClass = pathname.replace("/news/", "");
      const response = await fetch(
        `http://localhost:8000/v1/news/newsclass/${newsClass}`
      );
      const data = await response.json();
      const sortedNews = data.news?.sort(
        (a, b) => b.viewCounter - a.viewCounter
      );
      setNews(sortedNews);
    };
    if (pathname === "/") {
      fetchHotNews();

      const intervalId = setInterval(fetchHotNews, 5000);

      return () => clearInterval(intervalId);
    } else {
      fetchNews();
      const intervalId = setInterval(fetchNews, 5000);

      return () => clearInterval(intervalId);
    }
  }, [pathname]);
  return (
    <>
      {pathname !== "/" && <Title title={pathname.replace("/news/", "").toUpperCase()} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pathname === "/" ? (
          <>
            {news?.slice(0, 4).map((news) => (
              <div key={news._id}>
                <NewsBox {...news} />
              </div>
            ))}
          </>
        ) : (
          <>
            {news?.map((news) => (
              <div key={news._id}>
                <NewsBox {...news} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
