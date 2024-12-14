import { ethers } from 'ethers';
import FundStartup from '../../../components/FundStartUp'; 
import { SERVER_URL } from "../../../../constants";

interface Funder {
  walletAddress: string;
  amount: number; 
}

interface Startup {
  id: string;
  startupName: string;
  description: string;
  website: string;
  docs: string;
  image: string;
  walletAddress: string;
  totalFunded: Number;
  funders: Funder[];
}

async function fetchStartupDetails(id: string): Promise<Startup> {
  try {
    const response = await fetch(`${SERVER_URL}/startups/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch startup details');
    }
    const data: Startup = await response.json();
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || 'An unknown error occurred');
  }
}

const StartupDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  let startup: Startup | null = null; 
  let error = '';

  try {
    startup = await fetchStartupDetails(id);
  } catch (e) {
    error = (e as Error).message;
  }

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!startup) return <p className="text-center text-gray-500">No startup found</p>;
  const totalFundedInEther = (startup.totalFunded);

  return (
    <div className="container mx-auto  p-10 max-w-4xl border-2 border-gray-300 bg-white shadow-lg rounded-xl mt-10">
      {/* Startup Header */}
      <div className="flex items-center mb-6">
        <img
          src="/start.jpg"
          alt={startup.startupName}
          className="w-16 h-16 rounded-full shadow-md"
        />
        <h1 className="text-4xl font-extrabold ml-6 text-gray-800">{startup.startupName}</h1>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Description and Resources */}
      <div className="mb-8">
        <p className="text-xl font-semibold text-gray-900 mb-4">Description</p>
        <p className="text-lg text-gray-600">{startup.description}</p>
      </div>

      {/* Resources */}
      <div className="mb-8">
        <p className="text-xl font-semibold text-gray-900 mb-4">Resources</p>
        <div className="space-y-4">
          <p className="text-gray-600">
            <strong className="font-semibold mr-4">Website:</strong> 
            <a
              href={startup.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {startup.website}
            </a>
          </p>
          <p className="text-gray-600">
            <strong className="font-semibold mr-4">Documentation:</strong> 
            <a
              href={startup.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {startup.docs}
            </a>
          </p>
          <p className="text-gray-600">
            <strong className="font-semibold mr-4">Wallet Address:</strong> 
            <span className="ml-4 text-gray-500">{startup.walletAddress}</span>
          </p>
        </div>
      </div>

      <hr className="border-gray-300 mb-6" />

     

      {/* FundStartup Component */}
      <FundStartup startupId={startup.id} />

     
    </div>
  );
};

export default StartupDetailsPage;
