"use client";

import React, { useState } from "react";
import Image from "next/image";
import ConnectWalletButton from "./ConnectWallet";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  
  const isActive = (route: string) => pathname === route;

  return (
    <header className="py-2 text-center shadow-md sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-1">
     
        <div className="flex items-center space-x-2">

          <a href="/" className="text-lg xl:text-xl font-semibold text-[#f7b302]">
            W3 Venture
          </a>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

       
        <div className="hidden md:flex space-x-10">
          <a
            href="/"
            className={`text-lg p-1  font-semibold transition-all duration-300  ${
              isActive("/") ? "text-[#f7b302]" : "hover:text-gray-300"
            }`}
          >
            Home
          </a>
          <a
            href="/startups"
            className={`text-lg p-1  font-semibold transition-all duration-300 ${
              isActive("/startups") ? "text-[#f7b302] " : "hover:text-gray-300"
            }`}
          >
            Startups
          </a>
          <a
            href="/create"
            className={`text-lg p-1 font-semibold  transition-all duration-300 ${
              isActive("/create") ? "text-[#f7b302] " : "hover:text-gray-300"
            }`}
          >
            Register Startup
          </a>
          <a
            href="/my-startups"
            className={`text-lg p-1 font-semibold transition-all duration-300  ${
              isActive("/my-startups") ? "text-[#f7b302]" : "hover:text-gray-300"
            }`}
          >
            My Startups
          </a>
          <ConnectWalletButton />
        </div>
      </nav>

  
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 px-6">
          <a
            href="/"
            className={`block  text-start ml-4 text-lg font-semibold transition-all duration-300 ${
              isActive("/") ? "text-[#f7b302]" : "hover:text-gray-300"
            }`}
          >
            Home
          </a>
          <a
            href="/startups"
            className={`block text-start ml-4 text-lg font-semibold transition-all duration-300 ${
              isActive("/startups") ? "text-[#f7b302]" : "hover:text-gray-300"
            }`}
          >
            Startups
          </a>
          <a
            href="/create"
            className={`block  text-start ml-4 text-lg font-semibold transition-all duration-300 ${
              isActive("/create") ? "text-[#f7b302]" : "hover:text-gray-300"
            }`}
          >
            Register Startup
          </a>
          <a
            href="/my-startups"
            className={`block text-start ml-4 text-lg font-semibold transition-all duration-300 ${
              isActive("/my-startups") ? "text-[#f7b302]" : "hover:text-gray-300"
            }`}
          >
            My Startups
          </a>
          <ConnectWalletButton />
        </div>
      )}
    </header>
  );
};

export default Navbar;
