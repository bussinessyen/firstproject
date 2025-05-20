import { ethers } from "hardhat";

async function main() {
  const FreelanceEscrow = await ethers.getContractFactory("FreelanceEscrow");
  const escrow = await FreelanceEscrow.deploy();
  await escrow.waitForDeployment();

  console.log("FreelanceEscrow deployed to:", await escrow.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
