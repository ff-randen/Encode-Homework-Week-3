import { ethers } from "ethers";
import { TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";
import "dotenv/config";
require("dotenv").config();

const account = process.env.PUBLIC_KEY1 ?? "";
const proposalId = 1;
const voteAmount = ethers.parseUnits("3");

async function main() {
  // Configuration
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ""
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY1 ?? "", provider);
  const contractFactory = new TokenizedBallot__factory(wallet);
  const contract = contractFactory.attach(
    process.env.TOKENIZEDBALLOT_CONTRACT ?? ""
  ) as TokenizedBallot;

  // Casting a vote
  const votingTx = await contract.vote(proposalId, voteAmount);
  await votingTx.wait();

  const proposal = await contract.proposals(proposalId);
  const proposalName = ethers.decodeBytes32String(proposal.name);
  console.log(`Account ${account} has voted for ${proposalName}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
