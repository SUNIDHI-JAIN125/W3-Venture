"use client"; 
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { startupABI, PolygonContractAddress , SERVER_URL} from '../../constants';
import { connectWallet } from '../utils/wallet';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const StartupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    startupName: '',
    description: '',
    website: '',
    docs: '',
    walletAddress: '',
    image: ''
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const walletAddress = await connectWallet();
    if (!walletAddress) {
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
      const response = await fetch(`${SERVER_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        const startupId = data.userStartup._id;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(PolygonContractAddress, startupABI, signer);
        const tx = await contract.initialize(startupId, walletAddress);
        await tx.wait();

        toast.update(processingToastId, {
          render: `Transaction successful! View it on Etherscan: https://polygonscan.com/tx/${tx.hash}`,
          autoClose: 5000,
          isLoading: false,
        });

        router.push(`/startups/${startupId}`);
      } else {
        const errorData = await response.json();
        toast.error('Registration failed: ' + errorData.error, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Error processing transaction: ' + error, {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent shadow-lg border-4 border-blue-300 rounded-lg p-8">
      <ToastContainer />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-white mb-2">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-white mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-white mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-white mb-2">Startup Name</label>
          <input
            type="text"
            name="startupName"
            placeholder="Your startup's name"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-white mb-2">Description</label>
          <textarea
            name="description"
            placeholder="Describe your startup"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-lg font-medium text-white mb-2">Website URL</label>
          <input
            type="text"
            name="website"
            placeholder="https://yourstartup.com"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-white mb-2">Documentation URL</label>
          <input
            type="text"
            name="docs"
            placeholder="Link to your startup docs"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-white mb-2">Wallet Address</label>
          <input
            type="text"
            name="walletAddress"
            placeholder="Wallet address for funding"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-white mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="Image URL for your startup logo"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 mt-5 pt-3   text-xl font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Register Startup'}
        </button>
      </form>
    </div>
  );
};

export default StartupForm;
