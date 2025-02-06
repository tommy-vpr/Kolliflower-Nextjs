"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { animateTitles } from "@/lib/animateTitles";

import strains from "@/data/strains";
import Link from "next/link";

// const products = Array(12).fill({
//   image: "/images/hover-3.png",
//   title: "Kolliflower",
//   price: "$19.00",
// });

const ProductsPage = () => {
  useEffect(() => {
    gsap.fromTo(
      "#products-title",
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.to("#products-title", {
            scale: 1,
            duration: 0.2,
            ease: "power2.inOut",
          });
        },
      }
    );

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scaleFactor = Math.max(0.65, 1 - scrollY / 1000); // Scale down but not below 0.65

      gsap.to("#products-title", { scale: scaleFactor, duration: 0.1 });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // animateTitles();
  }, []);

  return (
    <>
      {/* Title Section with GSAP Animation */}
      <div className="products-main">
        <Image
          id="products-title"
          className="about-title"
          src="/images/products-title.webp"
          alt="Products"
          width={500}
          height={200}
        />
      </div>

      {/* Product Grid */}
      <div className="products-mid">
        <div className="products-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {strains.map((product, index) => (
            <Link href={`/products/${product.name}`} key={product.name}>
              <div className="products-item bg-white p-4 rounded-lg">
                <div className="product-item-img">
                  <Image
                    src={"/images/hover-3.png"}
                    alt={product.name}
                    width={300}
                    height={300}
                  />
                </div>
                <div className="product-item-info">
                  <h3 className="product-item-title font-bold">
                    {product.name}
                  </h3>
                  {/* <p className="product-item-price text-lg">{product.price}</p> */}
                  <button className="product-shop-now bg-black text-white px-4 py-2 rounded-md mt-3">
                    Shop Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
