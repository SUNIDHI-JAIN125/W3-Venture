# 🚀  W3 Venture Platform - Decentralised Fund-Raising for Startups

W3 Venture is a decentralized fundraising platform designed to empower founders and investors.Our mission is to connect emerging startups with everyday investors who are eager to join the next big idea but may not invest in millions.
This platform also democratizes funding opportunities, allowing startups that traditional venture capitalists(VCs) have overlooked to access the resources they need to succeed.

<br/>

## 🌟 Key Features

  - **Empower Founders:**
Provide a platform for startups that have great potential but struggle to secure funding from conventional sources.

  - **Accessible Investing:**
Enable everyday investors to discover and fund innovative projects without needing to invest large sums.

   - **Decentralized Transactions:**
Leverage blockchain technology to ensure transparency, security, and trust in every transaction.

 - **Community-Driven:**
Foster a community of supporters who believe in the vision of emerging startups and want to contribute to their success.

 - **Smart Contracts:**
 Utilize smart contracts to automate investment processes and ensure that funds are released based on predefined milestones.

<br/>

## 📂 Project Structure

- **Frontend:**  Next.js + ethers.js for seamless blockchain interaction.

- **Backend:** Node.js, Express (for API gateway and off-chain operations).

- **Blockchain:** Polygon and Ethereum to handle fundraising and transaction logic.

- **Database:** MongoDB for off-chain data storage and project details.


<br/>

## Getting Started


### Prerequisites
- Node.js and npm installed
- Yarn or npm
- Foundry (for smart contract development)
- A Web3 wallet (e.g., MetaMask) installed in your browser

### Installation


1. **Clone the repository:**
   ```bash
   git clone https://github.com/SUNIDHI-JAIN125/W3-Venture.git
   cd W3-Venture
   ```

2. **Install dependencies:**
   ```bash
   cd frontend
   yarn install
   # or
   npm install
   ```
   
3. **Run the frontend:**
    ```bash
    yarn dev
    # or
    npm run dev
    ```
    
4. **Start the Backend Server:**
   ```bash
    cd backend
    yarn install
    # or
    npm install

    yarn dev
    # or
    npm run dev
   ```
  
5. **Compile the smart contracts:**
    ```bash
    cd smart-contract
    forge build
    ```
  

6. **Deploy the smart contracts:**
    ```bash
    forge script script/DeployStartupFunding.s.sol:Deploy --broadcast
     ```

<br/>

## Links to Smart Contract Addresses

Our Platform is deployed on Polygon Cardona(zkEVM) Testnet and Sepolia Testnet

### Polygon 
- PolygonContractAddress = "0xff44C4A0EBC555c1e6682405a520b31aB8eE7531"
###  Sepolia
- SepoliaContractAddress = "0x115146a36c6f0dE9276fD6fD18eB4718106cA628"
  
<br/>

### Contributing
Contributions to Ringle are welcome! Feel free to report bugs, suggest features, or submit pull requests
  
 

