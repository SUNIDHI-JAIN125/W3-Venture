import React from 'react';
import Link from 'next/link';

interface StartupCardProps {
  startup: {
    _id: string;
    startupName: string;
    image: string;
    description: string;  
    totalFunded:Number;
  };
}

const StartupCard: React.FC<StartupCardProps> = ({ startup }) => {
  return (
    <div className="bg-transparent border-2  rounded-lg border-purple-200 shadow-lg transition-transform transform  overflow-hidden">
      {/* Placeholder for startup image */}
      <div className="h-12 bg-purple-200 flex  p-4 justify-center">
        <p className="text-black font-bold text-xl items-center justify-center m-auto"> Total Funded - {startup.totalFunded} wei</p>
      </div>
      <div className="p-6">
        <h2 className="text-4xl font-bold text-white mb-2 pt-3 mt-2">{startup.startupName}</h2>
        <p className="text-gray-400 mb-4 text-2xl pt-3 mt-2">{startup.description}</p>
        <Link href={`/startups/${startup._id}`}>
          <p className="text-white font-bold pt-6 mt-6 hover:text-purple-400">EXPLORE MORE > </p>
        </Link>
      </div>
    </div>
  );
};

export default StartupCard;
