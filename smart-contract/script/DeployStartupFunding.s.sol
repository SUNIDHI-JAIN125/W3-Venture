// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import { Script , console } from "forge-std/Script.sol"; 
import "../src/StartupFunding.sol"; 

contract DeployStartupFunding is Script {

    function run() external {
        
        vm.startBroadcast();

      
        StartupFunding funding = new StartupFunding();

      
        console.log("StartupFunding contract deployed at:", address(funding));

       
        vm.stopBroadcast();
    }
}