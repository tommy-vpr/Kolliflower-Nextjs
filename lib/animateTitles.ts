import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const animateTitles = () => {
  gsap.registerPlugin(ScrollTrigger);

  setTimeout(() => {
    const selectors = ["#about-title", "#products-title", "#faq-title"];

    selectors.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        gsap.fromTo(
          element,
          { scale: 1 },
          {
            scale: 0.65,
            scrollTrigger: {
              trigger: element,
              start: "top 12%",
              scrub: true,
            },
          }
        );
      }
    });
  }, 2000); // ✅ Delays ScrollTrigger initialization by 1 second
};
