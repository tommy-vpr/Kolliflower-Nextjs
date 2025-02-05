"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { animateTitles } from "@/lib/animateTitles";
import { ArrowUpRight } from "lucide-react";

const faqData = [
  {
    question: "What is THCA?",
    answer: `THCA is a cannabinoid that is essentially the raw form of the
              widely popular THC. In its natural state, THCA has pleasant
              uplifting characteristics without the strong, psychoactive effects
              that THC has. Once activated, THCA turns into THC, giving users a
              euphoric and stimulated experience.`,
  },
  {
    question: "Is THCA legal in my state?",
    answer: `THCA is illegal in the following states: Alaska, Arkansas,
              Colorado, Delaware, Hawaii, Idaho, Iowa, Minnesota, Montana,
              Nevada, New Hampshire, New York, North Dakota, Oregon, Rhode
              Island, South Dakota, Utah, Vermont, Washington. All states not
              listed are available for shipping.`,
  },
  {
    question: "Are your products hemp-derived?",
    answer: "Yes, all our products are made with legal THCA hemp flower.",
  },
  {
    question: "How old do you have to be to purchase THCA?",
    answer: "You must be at least 21 years old to purchase THCA.",
  },
  {
    question: "What products do you offer?",
    answer: "We offer premium grade THCA flower.",
  },
  {
    question: "Is it legal to buy hemp flower?",
    answer: (
      <>
        Due to the 2018 Farm Bill, industrial hemp with a Delta-9 THC
        concentration of no more than 0.3% is legalized, meaning that it is
        legal to buy hemp flower as long as it contains less than 0.3% Delta-9
        THC. If you would like to know more, check out our lab results{" "}
        <Link href="" className="faq-link">
          HERE
        </Link>
        .
      </>
    ),
  },
  {
    question: "Are your products lab-tested?",
    answer: (
      <>
        All of our products are third-party lab tested to ensure quality with
        every batch. Please take a look at our lab results{" "}
        <Link href="" className="faq-link">
          HERE
        </Link>
        .
      </>
    ),
  },
  {
    question: "Where can I buy Kolliflower?",
    answer: (
      <>
        We currently sell our products online and through our online retail
        partner, Burning Daily{" "}
        <Link href="" className="faq-link inline-flex">
          Shop Now
          <ArrowUpRight />
        </Link>
      </>
    ),
  },
  {
    question: "What is your return policy?",
    answer: `If, for any reason, you would like to return your order, products
              can be returned up to 7 days after the delivery date. Products
              must be in original packaging in order to be eligible for return.
              Please visit our Shipping and Returns page for more information.`,
  },
  {
    question: "When will my order be shipped?",
    answer: `Orders placed on a business day before 3:00PM PST are usually
              shipped out the next business day. Shipping in the United States
              usually takes between 2-5 business days depending on your location
              and method of shipping (First Class/Priority/Express). Please note
              that we do not process or ship orders over the weekends or major
              holidays.`,
  },
  {
    question: "Where do you ship to?",
    answer: `We do not ship to the following states where THCA is illegal:
              Alaska, Arkansas, Colorado, Delaware, Hawaii, Idaho, Iowa,
              Minnesota, Montana, Nevada, New Hampshire, New York, North Dakota,
              Oregon, Rhode Island, South Dakota, Utah, Vermont, Washington.`,
  },
];

const FaqPage = () => {
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const faqElements = document.querySelectorAll(
        ".conversation, .conversation--right"
      );

      faqElements.forEach((faq, index) => {
        faq.addEventListener("mouseenter", () => {
          const content = faq.querySelector(
            ".conversation-content"
          ) as HTMLDivElement;

          // Close all open FAQs
          document
            .querySelectorAll(".conversation.open, .conversation--right.open")
            .forEach((openFaq) => {
              const openContent = openFaq.querySelector(
                ".conversation-content"
              ) as HTMLDivElement;
              openContent.style.height = "0px";
              openFaq.classList.remove("open");
            });

          // Open the selected FAQ
          content.style.height = `${content.scrollHeight}px`;
          faq.classList.add("open");
        });
      });
    }
    gsap.fromTo(
      "#faq-title",
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.to("#faq-title", {
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

      gsap.to("#faq-title", { scale: scaleFactor, duration: 0.1 });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* FAQ Header */}
      <div className="faq-main">
        <Image
          id="faq-title"
          className="about-title"
          src="/images/faq-title-b.webp"
          alt="FAQ"
          width={500}
          height={200}
        />
      </div>

      {/* FAQ Content */}
      <div className="faq-mid">
        <div className="about-mid-content">
          {faqData.map((faq, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) faqRefs.current[index] = el;
              }}
              className={`cursor-pointer font-bold text-lg p-4 ${
                index % 2 === 0 ? "conversation" : "conversation--right"
              }`}
            >
              <p className="text-gray-500">{faq.question}</p>
              <div className="conversation-content overflow-hidden h-0 transition-all duration-300">
                <p className="p-4 text-[#111]">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FaqPage;
