"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { animateTitles } from "@/lib/animateTitles";

const page = () => {
  useEffect(() => {
    gsap.fromTo(
      "#about-title",
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.to("#about-title", {
            scale: 1,
            duration: 0.2,
            ease: "power2.inOut",
          });
        },
      }
    );

    // animateTitles();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scaleFactor = Math.max(0.65, 1 - scrollY / 1000); // Scale down but not below 0.65

      gsap.to("#about-title", { scale: scaleFactor, duration: 0.1 });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="about-main">
        <img
          id="about-title"
          className="about-title"
          src="images/about-title-d.webp"
          alt=""
        />
      </div>

      <div className="about-mid">
        <div className="conversation conversation--about">
          Kolliflower is all about good vibes and great flower. We specialize in
          legal THCA hemp flower that’s not just fire—it’s legit. Every batch we
          put out is grown with care, lab-tested to ensure quality, and ready to
          deliver that perfect hit every time.
        </div>
        <div className="conversation conversation--about">
          Whether you’re rolling up, packing a bowl, or just seshing it with
          friends, Kolliflower’s got your back. Stay high, stay true, and keep
          it Kolliflower.
        </div>
        <img
          className="about-weed-hero"
          src="images/weed-in-jars-b.webp"
          alt="about in hero"
          width="600px"
        />
      </div>
    </>
  );
};

export default page;
