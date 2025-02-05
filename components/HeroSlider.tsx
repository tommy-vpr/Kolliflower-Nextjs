"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSlider = () => {
  const heroWordsRef = useRef<NodeListOf<Element> | null>(null);
  const lastActiveElement = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      heroWordsRef.current = document.querySelectorAll(
        ".hero-word-1, .hero-word-2, .hero-word-3"
      );

      if (heroWordsRef.current.length > 0) {
        const observerOptions = { threshold: 1.0 };

        observerRef.current = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (
                lastActiveElement.current &&
                lastActiveElement.current !== entry.target
              ) {
                lastActiveElement.current.classList.remove("active");
              }
              entry.target.classList.add("active");
              lastActiveElement.current = entry.target;
            }
          });
        }, observerOptions);

        heroWordsRef.current.forEach((word) =>
          observerRef.current?.observe(word)
        );
      }
    }

    return () => {
      observerRef.current?.disconnect(); // ✅ Cleanup observer properly
    };
  }, []);

  return (
    <div className="hero-slider-wrapper">
      <div className="test">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay
          loop={true}
          speed={500}
          className="hero-slider"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="swiper-slide swiper-slide-hero" id="hero-1">
              <Image
                className="swiper-hero-word hero-word-1"
                src="/images/comic-word-6.webp"
                alt="boom"
                width={220}
                height={100}
                quality={100}
              />
              <img
                className="swiper-hero-img"
                src="/images/hero-bg-bw-4.webp"
                alt="hero-2"
              />
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="swiper-slide swiper-slide-hero" id="hero-2">
              <Image
                className="swiper-hero-word hero-word-2"
                src="/images/comic-word-4.webp"
                alt="boom"
                width={200}
                height={100}
                quality={100}
              />
              <img
                className="swiper-hero-img"
                src="/images/hero-bg-bw-2.webp"
                alt="hero-3"
              />
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="swiper-slide swiper-slide-hero" id="hero-3">
              <Image
                className="swiper-hero-word hero-word-3"
                src="/images/comic-word-5.webp"
                alt="boom"
                width={200}
                height={100}
              />
              <img
                className="swiper-hero-img"
                src="/images/hero-bg-bw-3.webp"
                alt="hero-1"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSlider;
