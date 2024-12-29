"use client";
import React, { useState, useEffect } from "react";
import { Sora } from "next/font/google";
import ImageSection from "../components/ImageSection";
import FaqSection from "../components/FaqSection";
import Image from "next/image";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700"] });

const HomePage = () => {
  const [bgColor, setBgColor] = useState("#ebdedc");

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const threshold = 150;
    if (scrollPosition > threshold) {
      setBgColor("#E0B0FF");
    } else {
      setBgColor("#ebdedc");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      className="flex flex-col text-white min-h-screen"
      style={{
        backgroundColor: bgColor,
        transition: "background-color 1s ease-in-out",
      }}
    >
      {/* Intro Section */}
      <div className="w-[85%] md:w-[75%] xl:w-[60%] mt-16 pl-[25%] h-[80vh]">
        <h1
          className={`${sora.className}  mt-10 text-4xl xl:text-6xl font-extrabold text-black`}
          style={{ lineHeight: "1.30" }}
        >
          Discover the world’s
        </h1>
        <p
          className={`${sora.className} text-4xl xl:text-6xl font-extrabold text-black`}
          style={{ lineHeight: "1.30" }}
        >
          top{" "}
          <span className="border-b-4 border-b-[#f7b302] font-extrabold">
            Ventures
          </span>{" "}
          <span className="text-[#f7b302]">.</span>
        </p>
        <p className="text-lg xl:text-xl mt-10 text-gray-600">
          W3 Venture is a decentralized fundraising platform that bridges the
          gap between founders and investors. Our mission is to connect
          emerging startups with everyday investors eager to support the next
          big idea, even without millions to invest. By democratizing funding
          opportunities, W3 Venture empowers startups often overlooked by
          traditional venture capitalists (VCs) to access the resources they
          need to thrive.
        </p>
        <p className="text-2xl md:text-3xl mt-10 pt-3 font-semibold text-black">
          Be the VC of tomorrow, today!
        </p>
      </div>

     
      <ImageSection />

<FaqSection/>


    
     
    </div>
  );
};

export default HomePage;
