"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const products = [
  { id: 1, image: "/images/hover-3.png", price: "$19.99" },
  { id: 2, image: "/images/hover-2.png", price: "$19.99" },
  { id: 3, image: "/images/hover-1.png", price: "$19.99" },
  { id: 4, image: "/images/hover-2.png", price: "$19.99" },
  { id: 5, image: "/images/hover-3.png", price: "$19.99" },
];

const ProductsSlider = () => {
  return (
    <div className="products-swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        speed={500}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 }, // Mobile
          768: { slidesPerView: 3, spaceBetween: 20 }, // Tablets
          1024: { slidesPerView: 4, spaceBetween: 30 }, // Desktop
        }}
        className="products-slider"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="products-item-slide">
            <div className="products-item-slide-img bubble bubble--highlight">
              <Image
                src={product.image}
                alt="Product"
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col mt-2">
              <h3 className="text-[16px] font-semibold">KOLLIFLOWER</h3>
              <p className="text-[15px]">{product.price}</p>
            </div>
            <a className="shop-now-btn" href="/">
              Shop Now
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
