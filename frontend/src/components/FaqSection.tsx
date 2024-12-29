"use client";
import React, { useState } from "react";
import { Sora } from "next/font/google";

interface Faq {
  question: string;
  answer: string;
}




const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700"] });

const FaqSection: React.FC = () => {
  const faqs: Faq[] = [
    {
      question: "What is W3 Venture?",
      answer:
        "W3 Venture is a decentralized fundraising platform designed to connect startups with everyday investors, bridging the gap between founders and traditional venture capitalists.",
    },
    {
      question: "Who can invest on W3 Venture?",
      answer:
        "Anyone can invest on W3 Venture. Our platform is designed to empower everyday investors by providing access to funding opportunities.",
    },
    {
      question: "How does W3 Venture ensure transparency?",
      answer:
        "We leverage blockchain technology to ensure all transactions and investments are transparent, secure, and traceable.",
    },
    {
      question: "What types of startups can join W3 Venture?",
      answer:
        "Startups from diverse industries, including tech, healthcare, and sustainability, are welcome to join W3 Venture.",
    },
    {
      question: "Is there a minimum investment amount?",
      answer:
        "Yes, we have a low minimum investment threshold to ensure accessibility for everyday investors.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full h-screen mt-2  bg-[#ebdedc]">
    <div className="w-[85%]  mt-10 xl:mt-20 md:w-[75%] xl:w-[60%] mx-auto   my-16">

        <h2
          className={`${sora.className} text-center mb-4 text-4xl xl:text-5xl font-extrabold text-black`}
        >
           In case you missed anything

          <span className="text-[#f7b302]">.</span>
        </h2>
      <div className="space-y-6 mt-16">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b p-7 items-center rounded-xl bg-[#dcccc9] ">
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={() => toggleFaq(index)}
            >
              <h3 className="text-lg font-medium text-black">
                {faq.question}
              </h3>
              <span className="text-xl font-bold text-black">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <p className="mt-4 text-gray-700 text-md">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FaqSection;
