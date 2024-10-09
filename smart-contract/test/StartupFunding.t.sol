// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

// import "forge-std/Test.sol";
// import "../src/StartupFunding.sol";

// contract StartupFundingTest is Test {
//     StartupFunding public funding;

//     address founder = address(0xABCD);  // Mock founder address
//     address funder1 = address(0x1111);  // Mock funder 1
//     address funder2 = address(0x2222);  // Mock funder 2

//     string startupId = "startup1"; // Test startup ID

//     function setUp() public {
//         funding = new StartupFunding();
//     }

//     /**
//      * @dev Test initialization of a startup.
//      */
//     function testInitializeStartup() public {
//         funding.initialize(startupId, founder);

//         // Access the startup struct directly
//         StartupFunding.Startup memory startup = funding.startups(startupId);

//         // Check if the startup is initialized properly
//         assertEq(startup.totalFunded, 0); // Startup should have 0 funds initially
//         assertEq(startup.founder, founder); // Founder address should match
//     }

//     /**
//      * @dev Test that startup initialization cannot be done twice.
//      */
//     function testCannotInitializeTwice() public {
//         funding.initialize(startupId, founder);

//         // Try initializing the startup again - expect it to fail
//         vm.expectRevert("Startup already initialized");
//         funding.initialize(startupId, founder);
//     }

//     /**
//      * @dev Test funding a startup.
//      */
//     function testFundStartup() public {
//         // Initialize the startup first
//         funding.initialize(startupId, founder);

//         // Fund the startup from funder1
//         vm.prank(funder1);  // Set the caller to be funder1
//         funding.fundStartup{value: 1 ether}(startupId);

//         // Access the startup struct directly
//         StartupFunding.Startup memory startup = funding.startups(startupId);

//         // Verify that the startup's total funded amount is updated
//         assertEq(startup.totalFunded, 1 ether);  // Total funded should now be 1 ether
//         assertEq(startup.founder, founder);  // Founder address should match

//         // Verify that funder1's details are stored correctly
//         assertEq(startup.funders.length, 1);
//         assertEq(startup.funders[0].walletAddress, funder1);
//         assertEq(startup.funders[0].amount, 1 ether);
//     }

//     /**
//      * @dev Test multiple fundings by the same funder.
//      */
//     function testMultipleFundingsBySameFunder() public {
//         funding.initialize(startupId, founder);

//         // Fund the startup twice by the same funder
//         vm.prank(funder1);
//         funding.fundStartup{value: 1 ether}(startupId);

//         vm.prank(funder1);
//         funding.fundStartup{value: 0.5 ether}(startupId);

//         // Access the startup struct directly
//         StartupFunding.Startup memory startup = funding.startups(startupId);

//         // Verify total funding amount
//         assertEq(startup.totalFunded, 1.5 ether);  // 1 ether + 0.5 ether

//         // Verify the updated funder details
//         assertEq(startup.funders.length, 1);
//         assertEq(startup.funders[0].walletAddress, funder1);
//         assertEq(startup.funders[0].amount, 1.5 ether); // Accumulated amount
//     }

//     /**
//      * @dev Test funding by multiple funders.
//      */
//     function testFundingByMultipleFunders() public {
//         funding.initialize(startupId, founder);

//         // Funder1 funds
//         vm.prank(funder1);
//         funding.fundStartup{value: 1 ether}(startupId);

//         // Funder2 funds
//         vm.prank(funder2);
//         funding.fundStartup{value: 2 ether}(startupId);

//         // Access the startup struct directly
//         StartupFunding.Startup memory startup = funding.startups(startupId);

//         // Verify total funding amount
//         assertEq(startup.totalFunded, 3 ether);  // 1 ether + 2 ether

//         // Verify funders' details
//         assertEq(startup.funders.length, 2);

//         // Funder1 details
//         assertEq(startup.funders[0].walletAddress, funder1);
//         assertEq(startup.funders[0].amount, 1 ether);

//         // Funder2 details
//         assertEq(startup.funders[1].walletAddress, funder2);
//         assertEq(startup.funders[1].amount, 2 ether);
//     }

//     /**
//      * @dev Test that funding an uninitialized startup fails.
//      */
//     function testCannotFundUninitializedStartup() public {
//         // Attempt to fund a startup that hasn't been initialized
//         vm.prank(funder1);
//         vm.expectRevert("Startup not initialized");
//         funding.fundStartup{value: 1 ether}(startupId);
//     }

//     /**
//      * @dev Test retrieving funded startups by a funder.
//      */
//     function testGetFundedStartups() public {
//         funding.initialize(startupId, founder);

//         // Funder1 funds the startup
//         vm.prank(funder1);
//         funding.fundStartup{value: 1 ether}(startupId);

//         // Verify that funder1 can retrieve the list of funded startups
//         vm.prank(funder1);
//         string[] memory fundedStartups = funding.getFundedStartups();
//         assertEq(fundedStartups.length, 1);
//         assertEq(fundedStartups[0], startupId);
//     }
// }
