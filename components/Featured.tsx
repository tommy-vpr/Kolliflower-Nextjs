"use client";

import { useEffect } from "react";
import gsap from "gsap";

const Featured = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".yoda");

    cards.forEach((card) => {
      const bgImage = card.querySelector(
        ".bg-image"
      ) as HTMLImageElement | null;

      if (!bgImage) return;

      const handleMouseOver = () => {
        bgImage.style.borderRadius = "15px";
        bgImage.src = bgImage.src.replace(".webp", "-hover.webp");

        gsap.to(bgImage, { duration: 0.3, ease: "power2.out" });
      };

      const handleMouseOut = () => {
        bgImage.src = bgImage.src.replace("-hover.webp", ".webp");

        gsap.to(bgImage, { scale: 1, duration: 0.3, ease: "power2.inOut" });
      };

      card.addEventListener("mouseover", handleMouseOver);
      card.addEventListener("mouseout", handleMouseOut);

      // Cleanup function to remove event listeners when component unmounts
      return () => {
        card.removeEventListener("mouseover", handleMouseOver);
        card.removeEventListener("mouseout", handleMouseOut);
      };
    });
  }, []);

  return (
    <div className="features">
      <div className="products-hero-title">
        <img src="/images/our-products-title.webp" alt="our products" />
      </div>

      <div className="center">
        <div className="cards-hover-container">
          <div className="yoda">
            <img
              className="front-image"
              src="/images/hover-5.webp"
              alt="yoda holding a lightsaber"
            />
            <img
              className="bg-image"
              src="/images/card-5.webp"
              alt="yoda looking peaceful"
            />
          </div>
        </div>
        <div className="cards-hover-container">
          <div className="yoda">
            <img
              className="front-image"
              src="/images/hover-6.webp"
              alt="yoda holding a lightsaber"
            />
            <img
              className="bg-image"
              src="/images/card-6.webp"
              alt="yoda looking peaceful"
            />
          </div>
        </div>
        <div className="cards-hover-container">
          <div className="yoda">
            <img
              className="front-image"
              src="/images/hover-7.webp"
              alt="yoda holding a lightsaber"
            />
            <img
              className="bg-image"
              src="/images/card-7.webp"
              alt="yoda looking peaceful"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
