import { ethers } from "ethers";
import { TokenizedBallot__factory } from "../typechain-types";
import "dotenv/config";
require("dotenv").config();

const MYTOKEN_CONTRACT = process.env.MYTOKEN_CONTRACT ?? "";

async function main() {
  // Configuration
  const proposals = process.argv.slice(2);
  if (!proposals || proposals.length < 1) {
    throw new Error("Proposals not provided");
  }
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ""
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY1 ?? "", provider);
  const contractFactory = new TokenizedBallot__factory(wallet);
  const lastBlock = await provider.getBlock("latest");
  const lastBlockNumber = lastBlock?.number ?? 0;

  // Deployment
  const contract = await contractFactory.deploy(
    proposals.map(ethers.encodeBytes32String),
    MYTOKEN_CONTRACT,
    lastBlockNumber
  );
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  console.log(`TokenizedBallot contract deployed at ${contractAddress}\n`);
  for (let index = 0; index < proposals.length; index++) {
    const proposal = await contract.proposals(index);
    const name = ethers.decodeBytes32String(proposal.name);
    console.log({ index, name, proposal });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
