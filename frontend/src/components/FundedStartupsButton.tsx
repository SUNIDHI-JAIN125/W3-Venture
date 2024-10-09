import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { PolygonContractAddress, startupABI } from './../../constants'; // Ensure ABI is correct

const FundedStartupsButton = () => {
  const [fundedStartups, setFundedStartups] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const fetchFundedStartups = async () => {
      try {
        if (!window.ethereum) {
          setError('MetaMask is not installed');
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress();

        // Replace with your contract address
        const contract = new ethers.Contract(PolygonContractAddress, startupABI, signer);

        // Call the `funderToStartups` method using the connected wallet address
        const startupCount = await contract.funderToStartups(walletAddress, 0); // Fetch first startup index to test

        const fundedStartups: string[] = [];
        let index = 0;
        while (true) {
          try {
            const startupId = await contract.funderToStartups(walletAddress, index);
            fundedStartups.push(startupId);
            index += 1;
          } catch (error) {
            // When there's no more funded startups for the wallet, break out of the loop
            break;
          }
        }

        // Check if the response is empty
        if (fundedStartups.length === 0) {
          setError('No startups funded by this wallet.');
        } else {
          setFundedStartups(fundedStartups);
        }
      } catch (err:any) {
        setError(`Error fetching funded startups: ${err.message}`);
      }
    };

    // Check if MetaMask is connected
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts: any) => {
          if (accounts.length > 0) {
            setWalletConnected(true);
            fetchFundedStartups();
          } else {
            setError('Wallet not connected. Please connect your wallet.');
          }
        })
        .catch(() => setError('Failed to fetch accounts from MetaMask'));
    } else {
      setError('MetaMask is not installed.');
    }
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!walletConnected) {
    return (
      <button onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}>
        Connect Wallet
      </button>
    );
  }

  return (
    <div>
      <h2>Your Funded Startups</h2>
      <ul>
        {fundedStartups.map((startupId, index) => (
          <li key={index}>{startupId}</li>
        ))}
      </ul>
    </div>
  );
};

export default FundedStartupsButton;
