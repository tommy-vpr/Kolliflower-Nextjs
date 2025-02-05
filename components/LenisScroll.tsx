"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const LenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9, // Controls speed
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // Smooth ease
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy(); // Cleanup on unmount
  }, []);

  return null;
};

export default LenisScroll;
