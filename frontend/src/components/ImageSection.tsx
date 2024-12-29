"use client";
import React from "react";
import Image from "next/image";

const ImageSection = () => {
  return (
    <div className="flex flex-col space-y-12 mt-4 p-8 rounded-lg mb-10">
      {/* Section 1 */}
      <div className="flex flex-row items-center justify-evenly space-x-2">
        <div className="relative w-[300px] md:w-[350px] xl:w-[500px] h-[200px] md:h-[250px] xl:h-[350px] shadow-lg border-4 border-black rounded-2xl">
          <Image
            src="/ringle1.png"
            alt="Innovation Image"
            fill
            className="object-cover"
          />
        </div>
        <ul className="text-black text-lg xl:text-xl space-y-4">

          <li className="flex items-start font-bold   text-gray-800 xl:text-2xl">
            <div className="w-4 h-4 bg-purple-500  rounded-sm mt-2 mr-3"></div>
            Innovative platform design for startups.
          </li>
          <li className="flex items-start font-bold  text-gray-800 xl:text-2xl">
            <div className="w-4 h-4 bg-purple-500  text-black rounded-sm mt-2 mr-3"></div>
            Focus on decentralization and transparency.
          </li>
          <li className="flex items-start font-bold text-gray-800  xl:text-2xl">
            <div className="w-4 h-4 bg-purple-500 text-black rounded-sm mt-2 mr-3"></div>
            Bridging the gap between founders and investors.
          </li>
        </ul>
      </div>


   


      {/* Section 2 */}
      <div className="flex flex-row-reverse items-center space-x-reverse justify-evenly space-x-2">
      <div className="relative  mt-6 md:mt-20 w-[300px] md:w-[350px] xl:w-[500px] h-[200px] md:h-[250px] xl:h-[350px] shadow-lg border-4 border-black rounded-2xl">
          <Image
            src="/WeatherApp.png"
            alt="Marketplace Image"
            fill
            className="object-cover"
          />
        </div>
        <ul className="text-black text-lg xl:text-xl space-y-4">
        <li className="flex items-start font-bold   text-gray-800 xl:text-2xl">
            <div className="w-4 h-4 bg-purple-500  rounded-sm mt-2 mr-3"></div>
            Open access for everyday investors.
          </li>
          <li className="flex items-start font-bold   text-gray-800 xl:text-2xl">
          <div className="w-4 h-4 bg-purple-500  rounded-sm mt-2 mr-3"></div>
            Low barriers to entry for new participants.
          </li>
          <li className="flex items-start font-bold   text-gray-800 xl:text-2xl">
          <div className="w-4 h-4 bg-purple-500  rounded-sm mt-2 mr-3"></div>
            Empowering global community involvement.
          </li>
        </ul>
      </div>


      {/* Section 3 */}
      <div className="flex flex-row items-center justify-evenly space-x-2">
        <div className="relative  mt-6 md:mt-20  w-[300px] md:w-[350px] xl:w-[500px] h-[200px] md:h-[250px] xl:h-[350px] shadow-lg border-4 border-black rounded-2xl">
          <Image
            src="/Pattern-game.png"
            alt="Funding Ecosystem Image"
            fill
            className="object-cover"
          />
        </div>
        <ul className="text-black text-lg xl:text-xl space-y-4">
        <li className="flex items-start font-bold   text-gray-800 xl:text-2xl">
        <div className="w-4 h-4 bg-purple-500  rounded-sm mt-2 mr-3"></div>
            Enabling startups to achieve their dreams.
          </li>
          <li className="flex items-start font-bold   text-gray-800 xl:text-2xl">
          <div className="w-4 h-4 bg-purple-500  rounded-sm mt-2 mr-3"></div>
            Democratizing the funding ecosystem.
          </li>
          <li className="flex items-start font-bold   text-gray-800 xl:text-2xl">
          <div className="w-4 h-4 bg-purple-500  rounded-sm mt-2 mr-3"></div>
            Connecting ventures to supportive networks.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImageSection;
