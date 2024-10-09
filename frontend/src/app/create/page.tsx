"use client";
import React from 'react';
import StartupForm from '../../components/StartupForm';

const CreateStartupPage = () => {
  return (
    <div className=" flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-blue-300 mb-6 ">Register New Startup</h1>
      <div className="w-full max-w-3xl">
        <StartupForm />
      </div>
    </div>
  );
};

export default CreateStartupPage;
