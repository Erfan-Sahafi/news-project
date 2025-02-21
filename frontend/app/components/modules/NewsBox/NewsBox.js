import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { PiEye } from "react-icons/pi";

export default function NewsBox(props) {
  const pathname = usePathname()
  
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <Link href={pathname === '/' ? `news/${props.newsClass}/${props._id}`:`${props.newsClass}/${props._id}`}>
          <Image
            width={800}
            height={400}
            className="rounded-t-lg w-full h-48"
            src={`http://localhost:8000/news/covers/${props.cover}`}
            alt=""
          />
        </Link>
        <div className="p-5">
          <Link href={pathname === '/' ? `news/${props.newsClass}/${props._id}`:`${props.newsClass}/${props._id}`}>
            <h5 className="mb-2 text-2xl font-bold line-clamp-1 tracking-tight text-gray-900">
              {props.newsTitle}
            </h5>
          </Link>
          <p className="mb-3 font-normal line-clamp-3 text-gray-700">
            {props.newsBody}
          </p>
          <div className="flex items-center justify-between">
            <Link
              href={pathname === '/' ? `news/${props.newsClass}/${props._id}`:`${props.newsClass}/${props._id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-shade_2 focus:ring-4 focus:outline-none"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
            <div className="flex items-center gap-1 text-gray_10">
              <PiEye />
              <span>{props.viewCounter}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
