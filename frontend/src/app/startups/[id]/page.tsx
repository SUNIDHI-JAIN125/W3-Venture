import { ethers } from 'ethers'; // ethers.js to convert wei to ether
import FundStartup from '../../../components/FundStartUp'; // Import the FundStartup component

interface Funder {
  walletAddress: string;
  amount: number; // assuming amount is in Wei (a number type, or BigNumber if you're using ethers.js)
}

interface Startup {
  id: string;
  startupName: string;
  description: string;
  website: string;
  docs: string;
  image: string;
  walletAddress: string;
  totalFunded:Number;
  funders: Funder[];
}

async function fetchStartupDetails(id: string): Promise<Startup> {
  try {
    const response = await fetch(`https://w3-venture-avts.vercel.app/api/auth/startups/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch startup details');
    }
    const data: Startup = await response.json(); // Ensure this matches the Startup interface
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || 'An unknown error occurred');
  }
}

const StartupDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  let startup: Startup | null = null; // Declare the startup variable with the correct type
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
    <div className="container mx-auto p-10 max-w-5xl bg-transparent border-2  border-gray-300 rounded-xl">
      <div className='flex items-start'>
      <img
        src="/start.jpg"
        alt={startup.startupName}
        className="w-20 h-30 mb-4 rounded-lg  shadow-md"
      />   <h1 className="text-5xl font-bold ml-10  text-white  mb-4">{startup.startupName}
        
      </h1> 
      </div>
      <hr />
     
     <div className='mt-5 pt-5'>
      <p className="text-gray-700 mb-8 mt-2"> <span className='text-white text-3xl font-bold'>Description: </span> <br /> <br /> <span className='text-gray-300 text-xl'>{startup.description}</span></p>

      <p className="mb-2 mt-4">
        <span className='text-white text-3xl font-bold'>Resources: </span> <br /> <br />
        <strong className="font-semibold text-gray-300 text-xl">   - Website:</strong>{' '}
        <a
          href={startup.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline ml-4 text-xl"
        >
          {startup.website}
        </a>
      </p>
      <p>
        <strong className="font-semibold text-gray-300 text-xl">   - Documentation:  </strong>{' '}
        <a
          href={startup.docs}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline ml-4 text-xl"
        >
          {startup.docs}
        </a>
      </p>

      <p className="mt-4">
          <strong className="font-semibold text-gray-300 text-xl">- Wallet Address:</strong>{' '}
          <span className="ml-4 text-gray-300 text-xl">"{startup.walletAddress}"</span>
        </p>
      </div>

      {/* Displaying Funders */}
      {/* <div className="mt-4">
        <h2 className="text-2xl text-white font-semibold">Funders</h2>
        {startup.funders && startup.funders.length > 0 ? (
          <ul className="list-disc ml-5 space-y-2">
            {startup.funders.map((funder: Funder, index: number) => (
              <li key={index} className="flex justify-between">
                <span className="font-semibold text-gray-300">{funder.walletAddress}</span>
                <span className="text-gray-300">
                  {(funder.amount)} ETH
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300">No funders yet.</p>
        )}

        <p className="font-semibold mt-4 text-white">Total Funded: {totalFundedInEther} ETH</p>
      </div> */}

      {/* Add the Fund Startup component */}
      <FundStartup startupId={startup.id} />
    </div>
  );
};

export default StartupDetailsPage;
