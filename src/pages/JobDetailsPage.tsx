import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Clock, DollarSign, Tag, ArrowLeft, User, ExternalLink, CheckCircle, Send } from 'lucide-react';
import { format } from 'date-fns';
import { jobsAPI } from '../services/api';
import { createEscrowJob, releasePayment } from '../services/blockchain';
import { useWallet } from '../context/WalletContext';
import Button from '../components/common/Button';
import { JobStatus } from '../types';

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isConnected, walletAddress } = useWallet();
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('7');
  const [proposal, setProposal] = useState('');
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);
  const [isFundingEscrow, setIsFundingEscrow] = useState(false);
  const [isApprovingWork, setIsApprovingWork] = useState(false);
  const [workSubmission, setWorkSubmission] = useState('');
  const [isSubmittingWork, setIsSubmittingWork] = useState(false);
  
  const { data: job, isLoading, error, refetch } = useQuery({
    queryKey: ['job', id],
    queryFn: () => jobsAPI.getJob(id!),
    enabled: !!id,
  });
  
  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !id) return;
    
    setIsSubmittingBid(true);
    
    try {
      await jobsAPI.submitBid(id, {
        amount: parseFloat(bidAmount),
        deliveryTime: parseInt(deliveryTime),
        proposal,
      });
      
      // Refetch job to update UI
      refetch();
      
      // Reset form
      setBidAmount('');
      setDeliveryTime('7');
      setProposal('');
    } catch (error) {
      console.error('Error submitting bid:', error);
    } finally {
      setIsSubmittingBid(false);
    }
  };
  
  const handleFundEscrow = async () => {
    if (!isConnected || !job || !job.selectedBid) return;
    
    setIsFundingEscrow(true);
    
    try {
      const result = await createEscrowJob(
        job.id, 
        job.selectedBid.freelancer.walletAddress!, 
        job.selectedBid.amount.toString()
      );
      
      if (result.success) {
        // Update job status in DB
        await jobsAPI.getJob(job.id);
        refetch();
      }
    } catch (error) {
      console.error('Error funding escrow:', error);
    } finally {
      setIsFundingEscrow(false);
    }
  };
  
  const handleSubmitWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !job) return;
    
    setIsSubmittingWork(true);
    
    try {
      await jobsAPI.submitWork(job.id, workSubmission);
      refetch();
      setWorkSubmission('');
    } catch (error) {
      console.error('Error submitting work:', error);
    } finally {
      setIsSubmittingWork(false);
    }
  };
  
  const handleApproveWork = async () => {
    if (!isConnected || !job) return;
    
    setIsApprovingWork(true);
    
    try {
      const result = await releasePayment(job.id);
      
      if (result.success) {
        await jobsAPI.completeJob(job.id);
        refetch();
      }
    } catch (error) {
      console.error('Error approving work:', error);
    } finally {
      setIsApprovingWork(false);
    }
  };
  
  const isOwner = job?.clientId === 'user1'; // For demo, we'll assume user1 is logged in user
  const isSelectedFreelancer = job?.selectedFreelancerId === 'user2'; // For demo
  
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-neutral-200 rounded w-1/2"></div>
        <div className="h-4 bg-neutral-200 rounded w-full"></div>
        <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
        <div className="h-48 bg-neutral-200 rounded"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="bg-error-50 border border-error-200 rounded-lg p-4 text-error-700">
        <p className="font-medium">Error loading job details</p>
        <p className="text-sm">{error instanceof Error ? error.message : 'Job not found'}</p>
        <Link to="/jobs" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          ← Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <Link to="/jobs" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to jobs
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900">{job.title}</h1>
        </div>
        
        <div className="mt-4 md:mt-0">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            job.status === JobStatus.OPEN ? 'bg-success-100 text-success-800' :
            job.status === JobStatus.AWAITING_PAYMENT ? 'bg-warning-100 text-warning-800' :
            job.status === JobStatus.IN_ESCROW ? 'bg-primary-100 text-primary-800' :
            job.status === JobStatus.SUBMITTED ? 'bg-secondary-100 text-secondary-800' :
            job.status === JobStatus.COMPLETE ? 'bg-success-100 text-success-800' :
            'bg-neutral-100 text-neutral-800'
          }`}>
            {job.status}
          </span>
        </div>
      </div>
      
      {/* Job details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Job info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main details */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center mb-4">
              <img 
                src={job.client.profilePicture} 
                alt={job.client.username}
                className="h-10 w-10 rounded-full mr-4 object-cover"
              />
              <div>
                <h3 className="font-medium text-neutral-900">{job.client.username}</h3>
                <p className="text-sm text-neutral-500">
                  Posted {format(new Date(job.createdAt), 'PPP')}
                </p>
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none text-neutral-700">
              <p>{job.description}</p>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center text-neutral-500">
                <DollarSign className="h-4 w-4 mr-1.5 text-neutral-400" />
                <div>
                  <div className="font-medium text-neutral-900">{job.budget} ETH</div>
                  <div>Budget</div>
                </div>
              </div>
              
              <div className="flex items-center text-neutral-500">
                <Clock className="h-4 w-4 mr-1.5 text-neutral-400" />
                <div>
                  <div className="font-medium text-neutral-900">
                    {format(new Date(job.deadline), 'PPP')}
                  </div>
                  <div>Deadline</div>
                </div>
              </div>
              
              <div className="flex items-center text-neutral-500">
                <Tag className="h-4 w-4 mr-1.5 text-neutral-400" />
                <div>
                  <div className="font-medium text-neutral-900">{job.category}</div>
                  <div>Category</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bids section */}
          {job.status === JobStatus.OPEN && (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Bids ({job.bids.length})</h2>
              
              <div className="space-y-6">
                {job.bids.length > 0 ? (
                  job.bids.map(bid => (
                    <div key={bid.id} className="border-b border-neutral-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img 
                            src={bid.freelancer.profilePicture} 
                            alt={bid.freelancer.username}
                            className="h-8 w-8 rounded-full mr-3 object-cover"
                          />
                          <div>
                            <h3 className="font-medium text-neutral-900">{bid.freelancer.username}</h3>
                            <div className="flex items-center text-sm text-neutral-500">
                              <DollarSign className="h-3 w-3 mr-1" />
                              <span>{bid.amount} ETH</span>
                              <span className="mx-2">•</span>
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{bid.deliveryTime} days</span>
                            </div>
                          </div>
                        </div>
                        
                        {isOwner && (
                          <Button
                            size="sm"
                            onClick={() => jobsAPI.selectBid(job.id, bid.id).then(() => refetch())}
                          >
                            Accept Bid
                          </Button>
                        )}
                      </div>
                      
                      <p className="mt-3 text-sm text-neutral-600">
                        {bid.proposal}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-600">No bids yet. Be the first to bid on this job!</p>
                )}
              </div>
            </div>
          )}
          
          {/* Escrow funded status */}
          {job.status === JobStatus.AWAITING_PAYMENT && isOwner && job.selectedBid && (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Fund Escrow</h2>
              
              <div className="p-4 bg-primary-50 rounded-lg mb-6">
                <p className="text-primary-800">
                  You've selected <strong>{job.selectedBid.freelancer.username}</strong> for this job. 
                  The next step is to fund the escrow with <strong>{job.selectedBid.amount} ETH</strong>.
                </p>
              </div>
              
              <Button
                isLoading={isFundingEscrow}
                onClick={handleFundEscrow}
                icon={<DollarSign className="h-4 w-4" />}
              >
                Fund Escrow ({job.selectedBid.amount} ETH)
              </Button>
            </div>
          )}
          
          {/* Work submission section */}
          {job.status === JobStatus.IN_ESCROW && isSelectedFreelancer && (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Submit Work</h2>
              
              <form onSubmit={handleSubmitWork}>
                <div className="mb-4">
                  <label htmlFor="workSubmission" className="block text-sm font-medium text-neutral-700 mb-2">
                    Describe the completed work and provide any deliverables
                  </label>
                  <textarea
                    id="workSubmission"
                    rows={5}
                    className="block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Detail what you've accomplished and include links to any deliverables..."
                    value={workSubmission}
                    onChange={(e) => setWorkSubmission(e.target.value)}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  isLoading={isSubmittingWork}
                  icon={<Send className="h-4 w-4" />}
                >
                  Submit Work
                </Button>
              </form>
            </div>
          )}
          
          {/* Work submitted view */}
          {job.status === JobStatus.SUBMITTED && job.workSubmitted && (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Work Submission</h2>
              
              <div className="p-4 bg-neutral-50 rounded-lg mb-6">
                <p className="text-sm text-neutral-500 mb-2">
                  Submitted on {format(new Date(job.workSubmitted.submittedAt), 'PPP')}
                </p>
                <p className="text-neutral-700">{job.workSubmitted.content}</p>
              </div>
              
              {isOwner && (
                <div className="flex space-x-3">
                  <Button
                    onClick={handleApproveWork}
                    isLoading={isApprovingWork}
                    icon={<CheckCircle className="h-4 w-4" />}
                  >
                    Approve & Release Payment
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => jobsAPI.requestRevision(job.id, "Please make some changes").then(() => refetch())}
                  >
                    Request Revisions
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Completed Job */}
          {job.status === JobStatus.COMPLETE && (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-success-100 rounded-full text-success-600 mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">Job Completed Successfully</h2>
                <p className="text-neutral-600 mb-4">
                  Payment has been released to the freelancer
                </p>
                
                {job.completionTxHash && (
                  <a
                    href={`https://etherscan.io/tx/${job.completionTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Transaction
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Right column - Sidebar */}
        <div className="space-y-6">
          {/* Action card */}
          {job.status === JobStatus.OPEN && !isOwner && (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Submit a Bid</h2>
              
              {!isConnected ? (
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <p className="text-neutral-600 mb-3">
                    Connect your wallet to bid on this job
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitBid}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="bidAmount" className="block text-sm font-medium text-neutral-700 mb-1">
                        Bid Amount (ETH)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-4 w-4 text-neutral-400" />
                        </div>
                        <input
                          type="number"
                          id="bidAmount"
                          step="0.01"
                          min="0.01"
                          className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="0.00"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="deliveryTime" className="block text-sm font-medium text-neutral-700 mb-1">
                        Delivery Time (days)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-4 w-4 text-neutral-400" />
                        </div>
                        <input
                          type="number"
                          id="deliveryTime"
                          min="1"
                          max="60"
                          className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="proposal" className="block text-sm font-medium text-neutral-700 mb-1">
                        Your Proposal
                      </label>
                      <textarea
                        id="proposal"
                        rows={4}
                        className="block w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Describe why you're a good fit for this job..."
                        value={proposal}
                        onChange={(e) => setProposal(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                      isLoading={isSubmittingBid}
                    >
                      Submit Bid
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
          
          {/* Client info */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">About the Client</h2>
            
            <div className="flex items-center mb-4">
              <img 
                src={job.client.profilePicture} 
                alt={job.client.username}
                className="h-12 w-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h3 className="font-medium text-neutral-900">{job.client.username}</h3>
                <p className="text-sm text-neutral-500">
                  Member since {format(new Date(job.client.createdAt), 'MMM yyyy')}
                </p>
              </div>
            </div>
            
            <div className="border-t border-neutral-200 pt-4 text-sm">
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">Jobs Posted</span>
                <span className="font-medium text-neutral-900">{job.client.completedJobs || 0}</span>
              </div>
              
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">Rating</span>
                <span className="font-medium text-neutral-900">{job.client.rating || 'No ratings yet'}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-neutral-900 mb-1">Bio</h4>
              <p className="text-sm text-neutral-600">
                {job.client.bio || 'No bio available.'}
              </p>
            </div>
          </div>
          
          {/* Similar jobs */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Similar Jobs</h2>
            
            <div className="space-y-4">
              {Array(3).fill(0).map((_, index) => (
                <Link 
                  key={index} 
                  to={`/jobs/job-${index + 10}`}
                  className="block p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <h3 className="font-medium text-neutral-900 line-clamp-1">Another {job.category} Project</h3>
                  <p className="text-sm text-neutral-600 line-clamp-2 mt-1">
                    A similar project that requires expertise in {job.skills[index % job.skills.length]}.
                  </p>
                  <div className="flex items-center mt-2 text-sm text-neutral-500">
                    <DollarSign className="h-3 w-3 mr-1" />
                    <span>{(job.budget * (0.8 + index * 0.2)).toFixed(2)} ETH</span>
                    <span className="mx-2">•</span>
                    <span>Posted recently</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;