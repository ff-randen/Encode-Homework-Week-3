import { ethers } from "ethers";
import { TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";
import "dotenv/config";
require("dotenv").config();

const account = process.env.PUBLIC_KEY1 ?? "";

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
  const lastBlockNumber = await contract.targetBlockNumber();

  // Querying voting power
  const votingPowerTx = await contract.votingPower(account);
  console.log(
    `Account ${account} has ${votingPowerTx.toString()} units of voting power at the block ${lastBlockNumber}\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
