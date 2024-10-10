"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import StartupCard from '../../components/StartupCard';

const StartupsPage = () => {
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await axios.get('https://w3-venture-avts.vercel.app/api/auth/startups');
        setStartups(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  if (loading) return <p className="text-center text-gray-300">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <header className="mb-8 flex flex-col justify-between items-center bg-transparent">
    
        <Link href="/create">
         
        </Link>
      </header>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {startups.map((startup) => (
          <StartupCard key={startup._id} startup={startup} />
        ))}
      </div>
    </div>
  );
};

export default StartupsPage;
