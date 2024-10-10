"use client";
import React from 'react';
import Spline from '@splinetool/react-spline';
import { styled } from '@chakra-ui/react';

interface SplineProps {
  scene: string; 
}

const SplineComponent: React.FC<SplineProps> = ({ scene }) => {
  return (
    <div className="w-full h-[35rem]">
      <Spline scene={scene} />
      
    </div>
  );
};

export default SplineComponent;



