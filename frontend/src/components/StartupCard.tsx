import React from 'react';
import Link from 'next/link';

interface StartupCardProps {
  startup: {
    _id: string;
    startupName: string;
    image: string;
    description: string;
    totalFunded: number;
  };
}

const StartupCard: React.FC<StartupCardProps> = ({ startup }) => {

  const totalFunded = startup.totalFunded.toString();

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl overflow-hidden">
    
      <div className="h-48 bg-gray-200 flex justify-center items-center">
        <img
          src={startup.image}
          alt={startup.startupName}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold text-black mb-2">{startup.startupName}</h2>
        <p className="text-gray-500 text-lg mb-4">{startup.description}</p>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-800">Total Funded: {totalFunded} wei</p>
          <Link href={`/startups/${startup._id}`}>
            <p className="text-purple-600 hover:text-purple-800 font-semibold text-lg cursor-pointer">
              Explore More
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;
