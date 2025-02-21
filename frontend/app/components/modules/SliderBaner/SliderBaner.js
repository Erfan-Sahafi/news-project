"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SliderBaner() {
  return (
    <div className="swiper-container mb-20">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        <SwiperSlide>
          <div className="slide-content">
            <Image
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              src="/images/sportbaner.png"
              alt=""
              unoptimized
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <Image
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              src="/images/healthbaner.png"
              alt=""
              unoptimized
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <Image
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              src="/images/politicbaner.png"
              alt=""
              unoptimized
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <Image
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              src="/images/economicbaner.png"
              alt=""
              unoptimized
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
