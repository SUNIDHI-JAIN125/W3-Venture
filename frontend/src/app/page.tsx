"use client";
import React, { useState, useEffect } from "react";
import { Sora, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "600"] });

const images = ["/WeatherApp.png", "/ringle1.png", "/GroceryStore.png"]; 

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setFadeClass("fade-out");
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          setFadeClass("fade-in");
        }, 500);
      }, 3500); 
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const goToPrevious = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      setFadeClass("fade-in");
    }, 500);
  };

  const goToNext = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFadeClass("fade-in");
    }, 500);
  };

  return (
    <div className="flex flex-row items-center justify-between  text-white p-10 min-h-screen">
      
      <div
        className="w-1/2 relative"
        onMouseEnter={() => setIsPaused(true)} 
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden relative w-full h-[600px] rounded-2xl shadow-lg">
         
          <Image
            src={images[currentIndex]}
            alt={`Startup ${currentIndex + 1}`}
            width={400}
            height={300}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${fadeClass}`}
          />
        </div>
      </div>

     
      <div className="w-1/2 ml-auto text-right">
        <div className="flex flex-col">
          <h1 className={`${sora.className} text-6xl mt-14 font-extrabold text-black`}>
            Fund the StartUp You <span className="border-b-4 border-b-[#f7b302] font-extrabold">Love</span> <span className="text-[#f7b302]">.</span>
          </h1>
          <p className="text-4xl mt-4 pt-3 font-semibold text-black">Be the VC of tomorrow, today!</p>

       
          <ul className="text-2xl text-black space-y-3 mt-4">
            <li className="flex items-center">
              <input type="checkbox" checked className="mr-2" readOnly />
              Explore
            </li>
            <li className="flex items-center">
              <input type="checkbox" checked className="mr-2" readOnly />
              Invest
            </li>
            <li className="flex items-center">
              <input type="checkbox" checked className="mr-2" readOnly />
              Inspire
            </li>
          </ul>
        </div>

        <Link href="/startups">
          <button className="py-2 mt-4 px-6 bg-white text-black rounded-xl hover:text-purple-600 transition duration-300 ease-in-out shadow-lg text-xl">
            See All Startups
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
