"use client";
import React, { useState } from 'react';
import { connectWallet } from '../utils/wallet'; 

const ConnectWalletButton: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); 

  const handleConnect = async () => {
    setIsLoading(true); 
    try {
      const address = await connectWallet();
      if (address) {
        setWalletAddress(address);
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      {walletAddress ? (
        
        <div className="flex items-center ">
          <p className="text-green-500 font-semibold">Wallet Connected:</p>
          <p className="truncate">{walletAddress}</p>
        </div>
      ) : (
       
        <button
          onClick={handleConnect}
          className="connect-wallet-button"
          disabled={isLoading} 
        >
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
