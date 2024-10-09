"use client";

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import { startupABI, PolygonContractAddress } from '../../constants'; // ABI and contract address
import { connectWallet } from '../utils/wallet'; // Reuse the connectWallet function
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import axios for API requests

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
      // Step 1: Connect to Ethereum provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Step 2: Connect to the contract
      const contract = new ethers.Contract(PolygonContractAddress, startupABI, signer);

      // Step 3: Call the fundStartup function with the startup ID and ETH value
      const tx = await contract.fundStartup(startupId, { value: ethers.parseEther(fundingAmount) });

      // Wait for the transaction to complete
      await tx.wait();

      // Show success toast
      toast.update(processingToastId, {
        render: `Successfully funded! View transaction: https://polygonscan.com/tx/${tx.hash}`,
        autoClose: 5000,
        isLoading: false,
      });

      // Step 4: Call the backend fundStartup function
      await axios.post(`http://localhost:3000/api/auth/startups/${startupId}/fund`, {
        walletAddress,
        amount: ethers.parseEther(fundingAmount).toString() // Convert to string if necessary
      });

      // Navigate back to the startup details page after funding
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
          disabled={loading || !fundingAmount} // Disable if loading or no amount entered
        >
          {loading ? 'Funding...' : 'Fund Startup'}
        </button>
      </form>
    </div>
  );
};

export default FundStartup;
