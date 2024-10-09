import { startTransition } from 'react';

import STARTUPFUNDINGABI from './src/app/contract-abi/startup.abi.json';



export const startupABI = STARTUPFUNDINGABI

// contract address on sepolia 
export const SepoliaContractAddress = "0x115146a36c6f0dE9276fD6fD18eB4718106cA628"

// contract address on polygon
export const PolygonContractAddress = "0xff44C4A0EBC555c1e6682405a520b31aB8eE7531"



export const mainnet = {

    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'

}



export const Sepolia = {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io/',
    rpcUrl: 'https://rpc-sepolia.rockx.com'

}


export const Polygon = {
    chainId: 2442,
    name: 'Polygon zkEVM Cardona Testnet',
    currency: 'ETH',
    explorerUrl: 'https://cardona-zkevm.polygonscan.com',
    rpcUrl: 'https://polygon-zkevm-cardona.blockpi.network/v1/rpc/public'

}

