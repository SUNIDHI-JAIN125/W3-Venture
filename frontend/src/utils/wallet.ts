import { BrowserProvider } from 'ethers';

export const connectWallet = async (): Promise<string | null> => {
  try {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); 
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return address;
    } else {
      console.error("Ethereum provider not found!");
      return null;
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return null;
  }
};
