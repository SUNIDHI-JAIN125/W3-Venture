# 🚀  W3 Venture Platform - Decentralised Fund-Raising for Startups

W3 Venture is a decentralized fundraising platform designed to empower founders and investors.Our mission is to connect emerging startups with everyday investors who are eager to join the next big idea but may not invest in millions.
This platform also democratizes funding opportunities, allowing startups that traditional venture capitalists(VCs) have overlooked to access the resources they need to succeed.

## 🌟 Key Features

**1. Empower Founders:**
Provide a platform for startups that have great potential but struggle to secure funding from conventional sources.

**2. Accessible Investing:**
Enable everyday investors to discover and fund innovative projects without needing to invest large sums.

**3. Decentralized Transactions:**
Leverage blockchain technology to ensure transparency, security, and trust in every transaction.

**4. Community-Driven:**
Foster a community of supporters who believe in the vision of emerging startups and want to contribute to their success.

**5. Smart Contracts:**
 Utilize smart contracts to automate investment processes and ensure that funds are released based on predefined milestones.



## 📂 Project Structure

- **Frontend:**  Next.js + ethers.js for seamless blockchain interaction.

- **Backend:** Node.js, Express (for API gateway and off-chain operations).

- **Blockchain:** Polygon and Ethereum to handle fundraising and transaction logic.

- **Database:** MongoDB for off-chain data storage and project details.



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
   cd backend
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
   

4. **Compile the smart contracts:**
    ```bash
    cd smart-contract
    forge build
    ```
  

5. **Deploy the smart contracts:**
    ```bash
    forge script script/DeployStartupFunding.s.sol:Deploy --broadcast
     ```


## Links to Smart Contract Addresses

Our Platform is deployed on Polygon Cardona(zkEVM) Testnet and Sepolia Testnet

### Polygon 
PolygonContractAddress = "0xff44C4A0EBC555c1e6682405a520b31aB8eE7531"
###  Sepolia
SepoliaContractAddress = "0x115146a36c6f0dE9276fD6fD18eB4718106cA628"


### Contributing
Contributions to Ringle are welcome! Feel free to report bugs, suggest features, or submit pull requests
  
 

