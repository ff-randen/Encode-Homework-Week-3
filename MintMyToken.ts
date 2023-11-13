import { ethers } from "ethers";
import { MyToken__factory } from "../typechain-types";
import { MyToken } from "../typechain-types/contracts";
import "dotenv/config";
require("dotenv").config();

const MINT_VALUE = ethers.parseUnits("1");
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

  // Minting MyToken
  const mintTx1 = await contract.mint(account, MINT_VALUE);
  await mintTx1.wait();
  console.log(
    `Minted ${MINT_VALUE.toString()} decimal units to account ${account}\n`
  );
  const balanceAcc1 = await contract.balanceOf(account);
  console.log(
    `Account ${account} has ${balanceAcc1.toString()} decimal units of MyToken\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
