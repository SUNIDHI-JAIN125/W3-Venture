"use client";

import React from 'react';
import StartupForm from '../../components/StartupForm';

const CreateStartupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Register New Startup</h1>
      <div className="w-full max-w-3xl bg-white text-gray-900 p-8 rounded-lg shadow-lg">
        <StartupForm />
      </div>
    </div>
  );
};

export default CreateStartupPage;
