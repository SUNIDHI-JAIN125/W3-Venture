import React from "react";
import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google"; 
import "../styles/globals.css"; 
import { AuthProvider } from "../context/AuthContext"; 
import Navbar from "../components/Navbar";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "w3 Venture",
  description: "Fund the StartUp on which you Believe!",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Startup Platform</title>
      </head>
      <body className={`${spaceGrotesk.className} bg-[#ebdedc] min-h-screen flex flex-col`}>
        <AuthProvider>
          <Navbar />
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
