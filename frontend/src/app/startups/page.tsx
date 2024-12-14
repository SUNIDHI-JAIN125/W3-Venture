"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { SERVER_URL } from "../../../constants.js";
import StartupCard from "../../components/StartupCard";

const StartupsPage = () => {
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/startups`);
        setStartups(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  if (loading) return <p className="text-center text-gray-300">Loading startups...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div
  className="w-full p-6 min-h-screen"
  style={{
    transition: "background-color 0.5s ease-in-out",
  }}
>
  <header className="text-center mt-8 mb-12">
    <h1 className="text-4xl xl:text-5xl font-extrabold text-black">
      Discover Startups You Can Invest In
    </h1>
    <p className="mt-4 text-lg text-gray-600">
      Browse through the latest startups that are ready for funding and take part in their growth journey!
    </p>
    <Link href="/create">
      <button className="mt-6 px-6 py-3 bg-gray-800 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105  hover:shadow-2xl focus:outline-none">
        Register Startup
      </button>
    </Link>
  </header>

  {/* Startup Cards Grid */}
  <div className="grid gap-12 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
    {startups.map((startup) => (
      <div
        key={startup._id}
        className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out"
      >
        <StartupCard startup={startup} />
      </div>
    ))}
  </div>
</div>

  );
};

export default StartupsPage;
