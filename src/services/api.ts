import axios from 'axios';
import { Job, User, Bid } from '../types';

// This would be in an environment variable in a real application
const API_BASE_URL = 'https://api.example.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// For demo purposes, we'll use local storage to simulate authentication
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Auth endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    // In a real app, this would make an API call
    const mockResponse = {
      user: {
        id: 'user1',
        username: 'johndoe',
        email,
        walletAddress: '0x1234567890abcdef',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token',
    };
    
    setAuthToken(mockResponse.token);
    return mockResponse;
  },
  
  register: async (username: string, email: string, password: string) => {
    // In a real app, this would make an API call
    const mockResponse = {
      user: {
        id: 'user1',
        username,
        email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token',
    };
    
    setAuthToken(mockResponse.token);
    return mockResponse;
  },
  
  getCurrentUser: async () => {
    // In a real app, this would validate the token and return user data
    return {
      id: 'user1',
      username: 'johndoe',
      email: 'john@example.com',
      walletAddress: '0x1234567890abcdef',
      profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'Experienced web developer',
      skills: ['JavaScript', 'React', 'Node.js'],
      rating: 4.8,
      completedJobs: 15,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    };
  },
};

// Jobs endpoints
export const jobsAPI = {
  getAllJobs: async (): Promise<Job[]> => {
    // In a real app, this would make an API call
    // For demo purposes, we'll return mock data
    return generateMockJobs(10);
  },
  
  getJob: async (id: string): Promise<Job> => {
    // In a real app, this would make an API call
    // For demo purposes, we'll return mock data
    return generateMockJob(id);
  },
  
  createJob: async (jobData: Partial<Job>): Promise<Job> => {
    // In a real app, this would make an API call
    return {
      id: `job-${Date.now()}`,
      title: jobData.title || '',
      description: jobData.description || '',
      clientId: 'user1',
      client: generateMockUser('user1'),
      budget: jobData.budget || 0,
      deadline: jobData.deadline || new Date().toISOString(),
      category: jobData.category || 'Development',
      skills: jobData.skills || [],
      status: 'OPEN',
      bids: [],
      escrowFunded: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
  
  submitBid: async (jobId: string, bidData: Partial<Bid>): Promise<Bid> => {
    // In a real app, this would make an API call
    return {
      id: `bid-${Date.now()}`,
      jobId,
      freelancerId: 'user2',
      freelancer: generateMockUser('user2'),
      amount: bidData.amount || 0,
      deliveryTime: bidData.deliveryTime || 7,
      proposal: bidData.proposal || '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
  },
  
  selectBid: async (jobId: string, bidId: string): Promise<Job> => {
    // In a real app, this would make an API call
    const job = generateMockJob(jobId);
    const selectedBid = job.bids.find(bid => bid.id === bidId) || job.bids[0];
    
    return {
      ...job,
      selectedBid,
      selectedFreelancerId: selectedBid.freelancerId,
      status: 'AWAITING_PAYMENT',
      updatedAt: new Date().toISOString(),
    };
  },
  
  submitWork: async (jobId: string, content: string): Promise<Job> => {
    // In a real app, this would make an API call
    const job = generateMockJob(jobId);
    
    return {
      ...job,
      status: 'SUBMITTED',
      workSubmitted: {
        content,
        submittedAt: new Date().toISOString(),
      },
      updatedAt: new Date().toISOString(),
    };
  },
  
  requestRevision: async (jobId: string, feedback: string): Promise<Job> => {
    // In a real app, this would make an API call
    const job = generateMockJob(jobId);
    
    return {
      ...job,
      status: 'REVISION_REQUESTED',
      updatedAt: new Date().toISOString(),
    };
  },
  
  completeJob: async (jobId: string): Promise<Job> => {
    // In a real app, this would make an API call
    const job = generateMockJob(jobId);
    
    return {
      ...job,
      status: 'COMPLETE',
      completionTxHash: '0x' + Math.random().toString(16).substring(2, 42),
      updatedAt: new Date().toISOString(),
    };
  },
};

// Helper functions to generate mock data
function generateMockUser(id: string): User {
  const isFreelancer = id.includes('user2');
  
  return {
    id,
    username: isFreelancer ? 'janesmith' : 'johndoe',
    email: isFreelancer ? 'jane@example.com' : 'john@example.com',
    walletAddress: '0x' + Math.random().toString(16).substring(2, 42),
    profilePicture: isFreelancer 
      ? 'https://randomuser.me/api/portraits/women/2.jpg'
      : 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: isFreelancer 
      ? 'Freelance developer specializing in React and blockchain'
      : 'Startup founder looking for talented developers',
    skills: isFreelancer 
      ? ['React', 'Blockchain', 'Solidity', 'Web3']
      : ['Product Management', 'Business Development'],
    rating: 4.7 + Math.random() * 0.3,
    completedJobs: isFreelancer ? 12 : 5,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  };
}

function generateMockJob(id: string): Job {
  const skills = [
    'React', 'Node.js', 'TypeScript', 'Solidity', 'Web3', 
    'Smart Contracts', 'Frontend', 'Backend', 'Full Stack'
  ];
  
  const categories = [
    'Development', 'Design', 'Smart Contracts', 'Web3', 'dApp'
  ];
  
  const mockBids = Array(3).fill(0).map((_, index) => ({
    id: `bid-${index + 1}`,
    jobId: id,
    freelancerId: `user2-${index}`,
    freelancer: generateMockUser(`user2-${index}`),
    amount: 0.5 + Math.random() * 2,
    deliveryTime: 3 + Math.floor(Math.random() * 10),
    proposal: `I can build this for you with high quality. I have experience in ${skills[Math.floor(Math.random() * skills.length)]} and ${skills[Math.floor(Math.random() * skills.length)]}.`,
    status: 'PENDING',
    createdAt: new Date(Date.now() - Math.random() * 1000000).toISOString(),
  }));
  
  return {
    id,
    title: `Build a ${categories[Math.floor(Math.random() * categories.length)]} Application`,
    description: `We need a developer to create a ${categories[Math.floor(Math.random() * categories.length)]} application with features like user authentication, dashboard, and integration with our existing systems.`,
    clientId: 'user1',
    client: generateMockUser('user1'),
    budget: 1 + Math.random() * 3,
    deadline: new Date(Date.now() + 1000000000 + Math.random() * 10000000000).toISOString(),
    category: categories[Math.floor(Math.random() * categories.length)],
    skills: Array(3).fill(0).map(() => skills[Math.floor(Math.random() * skills.length)]),
    status: 'OPEN',
    bids: mockBids,
    escrowFunded: false,
    createdAt: new Date(Date.now() - Math.random() * 10000000).toISOString(),
    updatedAt: new Date(Date.now() - Math.random() * 1000000).toISOString(),
  };
}

function generateMockJobs(count: number): Job[] {
  return Array(count).fill(0).map((_, index) => generateMockJob(`job-${index + 1}`));
}