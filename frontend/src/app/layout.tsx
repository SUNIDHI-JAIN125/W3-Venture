// "use client";
import React from 'react';
import type { Metadata } from 'next';
import { Sora, Space_Grotesk } from 'next/font/google'; // Import custom fonts
import '../styles/globals.css'; // Import global CSS
import { AuthProvider } from '../context/AuthContext'; // Import the AuthProvider
import ConnectWalletButton from '../components/ConnectWallet'; // Import the ConnectWalletButton
import Link from 'next/link'; // Import Link for navigation

// Load Google Fonts with next/font
const sora = Sora({ subsets: ['latin'], weight: ['400', '600', '700'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '600'] });

export const metadata: Metadata = {
  title: 'TReK',
  description: 'Fund the StartUp on which you Believe!',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Startup Platform</title>
      </head>
      <body className={`${spaceGrotesk.className} bg-gray-850 min-h-screen flex flex-col`}>
        <AuthProvider>
          <header className="bg-transparent py-6 text-center">
            <nav className="flex justify-between items-center mt-6">
              <div className="flex space-x-8 ml-6">
                <a href="/" className="text-lg text-gray-300 hover:text-purple-300">Home</a>
                <a href="/startups" className="text-lg text-gray-300 hover:text-purple-300">Startups</a>
                <a href="/create" className="text-lg text-gray-300 hover:text-purple-300">Register Startup</a>
                <a href="/my-startups" className="text-lg text-gray-300 hover:text-purple-300">My Startups</a>
              </div>
              <div className="ml-auto">
                <ConnectWalletButton />
              </div>
            </nav>

            <hr className='pt-4 mt-6 text-purple-300'/>
            <h1 className={`${sora.className} pt-32 text-7xl pb-5 font-bold text-white`}>
              Fund the <span className='text-purple-400'>Startup</span> You Love
            </h1>
            <p className="text-4xl mt-4 pt-3 text-gray-300">
              Be the VC of tomorrow, today!
            </p>
          </header>
          <main className="flex-grow py-10">{children}</main>
          
          <footer className="text-center py-6 border-t border-gray-700">
            <p>&copy; 2024 Startup Platform</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
