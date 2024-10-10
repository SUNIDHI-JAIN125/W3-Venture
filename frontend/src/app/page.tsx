"use client";
import React from 'react';

import Link from 'next/link';
import SplineComponent from "../components/SplineComponent";
import Image from 'next/image'; 
import FundedStartupsButton from '../components/FundedStartupsButton'; 

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-blue-1000 text-white">

<div className="w-full">
          <SplineComponent scene="https://prod.spline.design/R-GBPibEMyCgkN9j/scene.splinecode" />
        </div>
      <div className='flex flex-col  h-max-content'>
       
     
        <p className="text-2xl text-purple-200 ">Explore and invest in innovative startups that inspire you.</p>
    
     
      </div>

      <Link href="/startups">
        <button className="py-2 mt-4 px-6 bg-white text-black rounded-xl hover:text-purple-600 transition duration-300 ease-in-out shadow-lg text-xl">
          See All Startups
        </button>
      </Link>

    

    </div>
  );
};

export default HomePage;
