import { ethers } from "ethers";
import { TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";
import "dotenv/config";
require("dotenv").config();

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

  // Querying the result
  const winnerNameTx = await contract.winnerName();
  const winnerName = ethers.decodeBytes32String(winnerNameTx);
  console.log(`${winnerName} is the winner!`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
