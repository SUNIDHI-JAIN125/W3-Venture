"use client";
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers'; 
import FundStartup from '../../components/FundStartUp'; 

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
        const response = await fetch('https://w3-venture-avts.vercel.app/api/auth/startup', {
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
  if (!startup) return <p className="text-center text-2xl  mt-3  text-gray-500">You have not registered any startup yet.</p>;

 
  const totalFundedInEther = (startup.totalFunded);

  return (
    <div className="container mx-auto p-10 max-w-5xl bg-transparent border-2 border-gray-300 rounded-xl">
      <div className="flex items-start">
        <img
          src="/start.jpg"
          alt={startup.startupName}
          className="w-20 h-30 mb-4 rounded-lg shadow-md"
        />
        <h1 className="text-5xl font-bold ml-10 text-white mb-4">{startup.startupName}</h1>
      </div>
      <hr />

      <div className="mt-5 pt-5">
        <p className="text-gray-700 mb-8 mt-2">
          <span className="text-white text-3xl font-bold">Description:</span>
          <br />
          <br />
          <span className="text-gray-300 text-xl">{startup.description}</span>
        </p>

        <p className="mb-2 mt-4">
          <span className="text-white text-3xl font-bold">Resources:</span>
          <br />
          <br />
          <strong className="font-semibold text-gray-300 text-xl">- Website:</strong>{' '}
          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-4 text-xl"
          >
            {startup.website}
          </a>
        </p>
        <p>
          <strong className="font-semibold text-gray-300 text-xl">- Documentation:</strong>{' '}
          <a
            href={startup.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-4 text-xl"
          >
            {startup.docs}
          </a>
        </p>

        <p className="mt-4">
          <strong className="font-semibold text-gray-300 text-xl">- Wallet Address:</strong>{' '}
          <span className="ml-4 text-gray-300 text-xl">"{startup.walletAddress}"</span>
        </p>
      </div>

      {/* Displaying Funders */}
      <div className="mt-4">
        <h2 className="text-2xl text-white font-semibold">Funders</h2>
        {startup.funders && startup.funders.length > 0 ? (
          <ul className="list-disc ml-5 space-y-2">
            {startup.funders.map((funder: Funder, index: number) => (
              <li key={index} className="flex justify-between">
                <span className="font-semibold text-gray-300">{funder.walletAddress}</span>
                <span className="text-gray-300">
                  {(funder.amount)} ETH
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300">No funders yet.</p>
        )}

        {/* <p className="font-semibold mt-4 text-white">Total Funded: {totalFundedInEther} ETH</p> */}
      </div>

    
      <FundStartup startupId={startup.id} />
    </div>
  );
};

export default MyStartupsPage;
