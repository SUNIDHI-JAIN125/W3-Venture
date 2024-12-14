"use client";

import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers'; 
import FundStartup from '../../components/FundStartUp'; 
import { SERVER_URL } from "../../../constants.js";

interface Funder {
  walletAddress: string;
  amount: number;
}

interface Startup {
  id: string;
  startupName: string;
  description: string;
  website: string;
  docs: string;
  walletAddress: string;
  image: string;
  totalFunded: number;
  funders: Funder[];
}

const MyStartupsPage = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { token, isAuthenticated } = authContext;
  const router = useRouter();
  const [startup, setStartup] = useState<Startup | null>(null); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); 
      return;
    }

    const fetchStartup = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/startup`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data: Startup = await response.json();
          setStartup(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch startup');
        }
      } catch (err) {
        console.error('Failed to fetch startup:', err);
        setError('An error occurred while fetching startup');
      }
    };

    fetchStartup();
  }, [isAuthenticated, router, token]);

  if (!isAuthenticated) return null;

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!startup) return <p className="text-center text-2xl mt-3 text-gray-500">You have not registered any startup yet.</p>;

  const totalFundedInEther = startup.totalFunded;

  return (
    <div className="container mx-auto p-10 max-w-5xl bg-transparent border-2 border-gray-300 rounded-xl mt-10">
      {/* Startup Header */}
      <div className="flex items-start mb-6">
        <img
          src='/start.jpg'
          alt={startup.startupName}
          className="w-24 h-24 rounded-lg shadow-md"
        />
        <h1 className="text-4xl font-extrabold ml-6 text-gray-800">{startup.startupName}</h1>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Description and Resources */}
      <div className="mb-8">
        <p className="text-xl font-semibold text-gray-900 mb-4">Description</p>
        <p className="text-lg text-gray-600">{startup.description}</p>
      </div>

      {/* Resources */}
      <div className="mb-8">
        <p className="text-xl font-semibold text-gray-900 mb-4">Resources</p>
        <div className="space-y-4">
          <p className="text-gray-600">
            <strong className="font-semibold mr-4">Website:</strong> 
            <a
              href={startup.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {startup.website}
            </a>
          </p>
          <p className="text-gray-600">
            <strong className="font-semibold mr-4">Documentation:</strong> 
            <a
              href={startup.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {startup.docs}
            </a>
          </p>
          <p className="text-gray-600">
            <strong className="font-semibold mr-4">Wallet Address:</strong> 
            <span className="ml-4 text-gray-500">{startup.walletAddress}</span>
          </p>
        </div>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Funders */}
      <div className="mb-8">
        <p className="text-xl font-semibold text-gray-900 mb-4">Funders</p>
        {startup.funders && startup.funders.length > 0 ? (
          <ul className="list-disc ml-5 space-y-2">
            {startup.funders.map((funder: Funder, index: number) => (
              <li key={index} className="flex justify-between">
                <span className="font-semibold text-gray-600">{funder.walletAddress}</span>
                <span className="text-gray-600">{funder.amount} ETH</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No funders yet.</p>
        )}
      </div>

     

      {/* FundStartup Component */}
      <FundStartup startupId={startup.id} />
    </div>
  );
};

export default MyStartupsPage;
