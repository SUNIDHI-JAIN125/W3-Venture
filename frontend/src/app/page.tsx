"use client";
import React, { useState, useEffect } from "react";
import { Sora, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "600"] });

const HomePage = () => {
 
  const [bgColor, setBgColor] = useState("#ebdedc");

  const handleScroll = () => {
    const scrollPosition = window.scrollY; 
    console.log('Scroll Position:', scrollPosition); 

    const threshold = 1000; 
    if (scrollPosition > threshold) {
      console.log('Threshold Reached: Changing Background Color');
      setBgColor("#E0B0FF"); 
    } else {
      setBgColor("#ebdedc"); 
    }
  };

  
  useEffect(() => {
  
    if (typeof window !== "undefined") {
      console.log("Component mounted, setting up scroll listener...");
      window.addEventListener("scroll", handleScroll);

     
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []); 

  return (
    <div
      className="flex flex-col text-white min-h-screen  "
      style={{
        backgroundColor: bgColor, 
        transition: "background-color 1s ease-in-out", 
      }}
    >
      {/* Left Content */}
      <div className="w-[85%] md:w-[75%] xl:w-[60%] mt-16 pl-[25%]">
        <h1
          className={`${sora.className} text-4xl xl:text-6xl font-extrabold text-black`}
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

        <p className="text-lg xl:text-xl mt-6 text-gray-600">
          W3 Venture is a decentralized fundraising platform that bridges the
          gap between founders and investors. Our mission is to connect
          emerging startups with everyday investors eager to support the next
          big idea, even without millions to invest. By democratizing funding
          opportunities, W3 Venture empowers startups often overlooked by
          traditional venture capitalists (VCs) to access the resources they
          need to thrive.
        </p>

        <p className="text-2xl md:text-3xl mt-8 pt-3 font-semibold text-black">
          Be the VC of tomorrow, today!
        </p>
      </div>

    
      <div className="mt-24 pr-[20%] flex flex-col items-end space-y-[-60px]">
       
        <div
          className="relative w-[700px] h-[450px] border-8 border-black shadow-lg z-10 rounded-2xl"
          style={{
            boxShadow: "0 0 0 2px #FF69B4", 
          }}
        >
          <Image
            src="/ringle1.png"
            alt="Image 1"
            fill
            className="object-cover"
          />
        </div>

        <div
          className="relative w-[680px] h-[430px] border-8 border-black shadow-lg -translate-y-16 translate-x-20 z-5 rounded-2xl"
          style={{
            boxShadow: "0 0 0 2px #FF69B4", 
          }}
        >
          <Image
            src="/GroceryStore.png"
            alt="Image 2"
            fill
            className="object-cover"
          />
        </div>

        <div
          className="relative w-[660px] h-[410px] border-8 border-black shadow-lg -translate-y-[5rem] translate-x-[12rem] z-0 rounded-2xl"
          style={{
            boxShadow: "0 0 0 2px #FF69B4", 
          }}
        >
          <Image
            src="/Pattern-game.png"
            alt="Image 3"
            fill
            className="object-cover"
          />
        </div>
      </div>

    
      <div className="flex flex-col items-center justify-center text-center gap-6 mb-6 mt-28 space-y-6">
        <h2 className={`${sora.className} text-4xl xl:text-6xl font-extrabold text-gray-100`}>
          Ready to Launch Your Startup?
        </h2>
        <p className="text-lg xl:text-xl text-white ">
          If you want to get funding and take your startup to the next level, <br />
          register your startup today and let us help you make your dreams come true!
        </p>

      
        <div className="relative w-[600px] m h-[400px] border-8 border-black shadow-lg rounded-2xl">
          <Image
            src="/Image.png"
            alt="Register your startup"
            fill
            className="object-cover"
          />
        </div>

     

    
      </div>
    </div>
  );
};

export default HomePage;
