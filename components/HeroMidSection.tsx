"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

const CallOut = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        ".gas",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gas",
            start: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div className="call-out">
      <div className="call-out-left">
        <h3 className="call-out-title">The FLower</h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, tenetur
        numquam vitae consectetur perferendis officia? Dignissimos quaerat,
        facilis suscipit ipsum, eligendi voluptatem dolorem iste blanditiis
        soluta ducimus et, atque iusto.
      </div>
      <div className="call-out-right">
        <img className="gas" src="images/gas.webp" alt="gas" />
        <img src="images/grounded-wee.webp" alt="" />
      </div>
    </div>
  );
};

export default CallOut;
