"use client";

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import { startupABI, PolygonContractAddress } from '../../constants'; 
import { connectWallet } from '../utils/wallet'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; 

const FundStartup = ({ startupId }: { startupId: string }) => {
  const [fundingAmount, setFundingAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFundingAmount(e.target.value);
  };

  const handleFundStartup = async (e: React.FormEvent) => {
    e.preventDefault();

    const walletAddress = await connectWallet();
    if (!walletAddress) {
      console.error("Wallet connection failed");
      toast.error("Wallet connection failed! Please try again.", {
        position: 'top-center',
      });
      return;
    }

    setLoading(true);
    const processingToastId = toast.info('Processing your transaction...', {
      position: 'top-center',
      autoClose: false,
    });

    try {
    
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

    
      const contract = new ethers.Contract(PolygonContractAddress, startupABI, signer);

      const tx = await contract.fundStartup(startupId, { value: ethers.parseEther(fundingAmount) });

   
      await tx.wait();

      toast.update(processingToastId, {
        render: `Successfully funded! View transaction: https://polygonscan.com/tx/${tx.hash}`,
        autoClose: 5000,
        isLoading: false,
      });

     
      await axios.post(`https://w3-venture-avts.vercel.app/api/auth/startups/${startupId}/fund`, {
        walletAddress,
        amount: ethers.parseEther(fundingAmount).toString() 
      });

     
      router.push(`/startups/${startupId}`);
    } catch (error: any) {
      console.error('Error funding startup:', error);
      toast.error('Error processing transaction: ' + error.message, {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 pt-4">
      <ToastContainer />
      <h2 className="text-xl font-semibold">Fund this Startup</h2>
      <form onSubmit={handleFundStartup} className="space-y-10">
        <input
          type="text"
          placeholder="Enter amount in ETH"
          value={fundingAmount}
          onChange={handleChange}
          className="w-full p-3  mt-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full cursor-pointer text-xl py-2  bg-blue-500 text-white  font-semibold rounded hover:bg-blue-600"
          disabled={loading || !fundingAmount} 
        >
          {loading ? 'Funding...' : 'Fund Startup'}
        </button>
      </form>
    </div>
  );
};

export default FundStartup;
