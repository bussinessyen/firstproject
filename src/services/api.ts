import axios from 'axios';
import { Job, User, Bid } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  },
  
  register: async (name: string, email: string, password: string, accountType: string) => {
    const response = await api.post('/users', { name, email, password, accountType });
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
};

// Jobs endpoints
export const jobsAPI = {
  getAllJobs: async () => {
    const response = await api.get('/jobs');
    return response.data;
  },
  
  getJob: async (id: string) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },
  
  createJob: async (jobData: Partial<Job>) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },
  
  submitBid: async (jobId: string, bidData: Partial<Bid>) => {
    const response = await api.post(`/jobs/${jobId}/bids`, bidData);
    return response.data;
  },
  
  selectBid: async (jobId: string, bidId: string) => {
    const response = await api.post(`/jobs/${jobId}/select-bid`, { bidId });
    return response.data;
  },

  submitWork: async (jobId: string, workSubmission: string) => {
    const response = await api.post(`/jobs/${jobId}/submit-work`, { workSubmission });
    return response.data;
  },

  completeJob: async (jobId: string) => {
    const response = await api.post(`/jobs/${jobId}/complete`);
    return response.data;
  },

  requestRevision: async (jobId: string, message: string) => {
    const response = await api.post(`/jobs/${jobId}/request-revision`, { message });
    return response.data;
  },
};
