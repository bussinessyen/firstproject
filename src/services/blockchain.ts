import { ethers } from 'ethers';

/**
 * ✅ Extend the Window interface to recognize `ethereum`
 */
declare global {
  interface Window {
    ethereum?: any;
  }
}

// ✅ Your deployed smart contract address
const CONTRACT_ADDRESS = "0x22148BC0f8dDc5D9902b6a7b7085F9FA6fFB3c0d";

// ✅ Define job state return type
export type ContractState = {
  jobId: string;
  client: string;
  freelancer: string;
  amount: string; // in ETH
  state: 'AWAITING_FUND' | 'AWAITING_DELIVERY' | 'COMPLETE' | 'REFUNDED';
};

// ✅ Simplified ABI for interacting with the Escrow smart contract
const escrowAbi = [
  "function createJob(uint jobId, address freelancer) external payable",
  "function submitWork(uint jobId) external",
  "function releasePayment(uint jobId) external",
  "function getJob(uint) public view returns (address client, address freelancer, uint amount, uint8 state, uint256 createdAt)",
  "event JobCreated(uint indexed jobId, address client, address freelancer, uint amount)",
  "event WorkSubmitted(uint indexed jobId, address freelancer)",
  "event PaymentReleased(uint indexed jobId, address freelancer, uint amount)"
];

/**
 * 🧠 Get Escrow contract instance
 */
export const getEscrowContract = async (withSigner = false) => {
  if (!window.ethereum) {
    throw new Error("Ethereum wallet not detected");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  if (withSigner) {
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, escrowAbi, signer);
  }

  return new ethers.Contract(CONTRACT_ADDRESS, escrowAbi, provider);
};

/**
 * 💼 Create a job and send ETH to the Escrow contract
 */
export const createEscrowJob = async (jobId: string, freelancerAddress: string, amount: string) => {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const escrowContract = await getEscrowContract(true);
    const wei = ethers.parseEther(amount);

    const tx = await escrowContract.createJob(jobId, freelancerAddress, { value: wei });
    const receipt = await tx.wait();

    return {
      success: true,
      txHash: receipt.hash,
    };
  } catch (error) {
    console.error("Error creating escrow job:", error);
    return {
      success: false,
      error: "Failed to create escrow job",
    };
  }
};

/**
 * 📤 Submit work completion for a job
 */
export const submitWork = async (jobId: string) => {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const escrowContract = await getEscrowContract(true);
    const tx = await escrowContract.submitWork(jobId);
    const receipt = await tx.wait();

    return {
      success: true,
      txHash: receipt.hash,
    };
  } catch (error) {
    console.error("Error submitting work:", error);
    return {
      success: false,
      error: "Failed to submit work",
    };
  }
};

/**
 * 💸 Release payment to freelancer after work is submitted
 */
export const releasePayment = async (jobId: string) => {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const escrowContract = await getEscrowContract(true);
    const tx = await escrowContract.releasePayment(jobId);
    const receipt = await tx.wait();

    return {
      success: true,
      txHash: receipt.hash,
    };
  } catch (error) {
    console.error("Error releasing payment:", error);
    return {
      success: false,
      error: "Failed to release payment",
    };
  }
};

/**
 * 🔍 Get job details and current state from the blockchain
 */
export const getJobState = async (jobId: string): Promise<ContractState | null> => {
  try {
    const escrowContract = await getEscrowContract();
    const result = await escrowContract.getJob(jobId);

    const stateMap = ["AWAITING_FUND", "AWAITING_DELIVERY", "COMPLETE", "REFUNDED"];

    return {
      jobId,
      client: result[0],
      freelancer: result[1],
      amount: ethers.formatEther(result[2]),
      state: stateMap[Number(result[3])] as ContractState["state"],
    };
  } catch (error) {
    console.error("Error getting job state:", error);
    return null;
  }
};
