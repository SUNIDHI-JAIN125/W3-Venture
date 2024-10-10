// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract StartupFunding {
    struct Funder {
        address walletAddress;
        uint256 amount;
    }

    struct Startup {
        uint256 totalFunded;
        address founder;
        Funder[] funders;
    }

   
    mapping(string => Startup) public startups; 
    mapping(address => string[]) public funderToStartups; 

    // Events
    event StartupInitialized(string startupId, address indexed founder);
    event Funded(string startupId, address indexed funder, uint256 amount);

    // Function to initialize a startup
    function initialize(string memory startupId, address founder) public {
        require(startups[startupId].founder == address(0), "Startup already initialized");
        Startup storage startup = startups[startupId];
        startup.founder = founder;  
        startup.totalFunded = 0; // Initialize total funded to 0

        emit StartupInitialized(startupId, founder); // Emit event
    }

    // Function to fund a startup
    function fundStartup(string memory startupId) public payable {
        require(msg.value > 0, "Funding amount must be greater than zero");
        Startup storage startup = startups[startupId];
        require(startup.founder != address(0), "Startup not initialized");  // Ensure startup is initialized

        startup.totalFunded += msg.value;

        // Update funder details
        bool found = false;
        for (uint256 i = 0; i < startup.funders.length; i++) {
            if (startup.funders[i].walletAddress == msg.sender) {
                startup.funders[i].amount += msg.value;
                found = true;
                break;
            }
        }

        if (!found) {
            startup.funders.push(Funder({ walletAddress: msg.sender, amount: msg.value }));
        }

        funderToStartups[msg.sender].push(startupId); // Update funder’s funded startups

        emit Funded(startupId, msg.sender, msg.value); // Emit funding event
    }

    // Function to get all startups funded by a given address
    function getFundedStartups() public view returns (string[] memory) {
        return funderToStartups[msg.sender];
    }

    // Function to retrieve funders for a specific startup
    function getFunders(string memory startupId) public view returns (Funder[] memory) {
        return startups[startupId].funders;
    }
}
