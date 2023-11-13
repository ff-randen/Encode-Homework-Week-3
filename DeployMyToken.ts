import { ethers } from "ethers";
import { MyToken__factory } from "../typechain-types";
import "dotenv/config";
require("dotenv").config();

async function main() {
  // Configuration
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ""
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY1 ?? "", provider);
  const contractFactory = new MyToken__factory(wallet);

  // Deployment
  const contract = await contractFactory.deploy();
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  console.log(`MyToken contract deployed at ${contractAddress}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
