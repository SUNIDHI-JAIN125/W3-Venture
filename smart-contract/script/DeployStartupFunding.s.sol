// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import { Script , console } from "forge-std/Script.sol"; 
import "../src/StartupFunding.sol"; // Import the contract

contract DeployStartupFunding is Script {

    function run() external {
        // Start broadcasting the transactions
        vm.startBroadcast();

        // Deploy the StartupFunding contract
        StartupFunding funding = new StartupFunding();

        // You can log the contract address for reference
        console.log("StartupFunding contract deployed at:", address(funding));

        // Stop broadcasting the transactions
        vm.stopBroadcast();
    }
}