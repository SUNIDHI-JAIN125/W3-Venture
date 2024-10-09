"use client";
import React, { useState } from 'react';
import { connectWallet } from '../utils/wallet'; 

const ConnectWalletButton: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleConnect = async () => {
    setIsLoading(true); // Set loading to true when the connection starts
    try {
      const address = await connectWallet();
      if (address) {
        setWalletAddress(address); // Set the wallet address if connection is successful
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    } finally {
      setIsLoading(false); // Set loading to false when the connection is done (success or fail)
    }
  };

  return (
    <div>
      {walletAddress ? (
        // If walletAddress is set, show the connected state
        <div className="flex items-center space-x-2">
          <p className="text-green-500 font-semibold">Wallet Connected:</p>
          <p className="truncate">{walletAddress}</p> {/* Show the connected wallet address */}
        </div>
      ) : (
       
        <button
          onClick={handleConnect}
          className="connect-wallet-button"
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
