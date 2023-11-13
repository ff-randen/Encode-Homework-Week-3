import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";
import { MyToken } from "../typechain-types/contracts";
import "dotenv/config";
require("dotenv").config();

const account = process.env.PUBLIC_KEY1 ?? "";

async function main() {
  // Configuration
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ""
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY1 ?? "", provider);
  const contractFactory = new MyToken__factory(wallet);
  const contract = contractFactory.attach(
    process.env.MYTOKEN_CONTRACT ?? ""
  ) as MyToken;

  // Delegation
  const votesBefore = await contract.getVotes(account);
  console.log(
    `Account ${account} has ${votesBefore.toString()} units of voting power before self-delegating\n`
  );
  const delegateTx = await contract.delegate(account);
  await delegateTx.wait();
  const votesAfter = await contract.getVotes(account);
  console.log(
    `Account ${account} has ${votesAfter.toString()} units of voting power after self-delegating\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
