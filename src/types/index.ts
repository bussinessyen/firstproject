export enum JobStatus {
  OPEN = 'OPEN',
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  IN_ESCROW = 'IN_ESCROW',
  SUBMITTED = 'SUBMITTED',
  REVISION_REQUESTED = 'REVISION_REQUESTED',
  COMPLETE = 'COMPLETE',
  DISPUTED = 'DISPUTED',
  RESOLVED = 'RESOLVED',
}

export interface User {
  id: string;
  username: string;
  email: string;
  walletAddress?: string;
  profilePicture?: string;
  bio?: string;
  skills?: string[];
  rating?: number;
  completedJobs?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Bid {
  id: string;
  jobId: string;
  freelancerId: string;
  freelancer: User;
  amount: number;
  deliveryTime: number; // in days
  proposal: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  clientId: string;
  client: User;
  budget: number;
  deadline: string;
  category: string;
  skills: string[];
  status: JobStatus;
  bids: Bid[];
  selectedBid?: Bid;
  selectedFreelancerId?: string;
  escrowFunded: boolean;
  escrowTxHash?: string;
  completionTxHash?: string;
  workSubmitted?: {
    content: string;
    submittedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ContractState {
  jobId: string;
  client: string;
  freelancer: string;
  amount: string;
  state: 'AWAITING_FUND' | 'AWAITING_DELIVERY' | 'COMPLETE' | 'REFUNDED';
}