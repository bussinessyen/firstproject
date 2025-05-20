import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, DollarSign, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Job, JobStatus } from '../../types';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const getStatusBadgeClass = (status: JobStatus) => {
    switch (status) {
      case JobStatus.OPEN:
        return 'bg-success-100 text-success-800';
      case JobStatus.AWAITING_PAYMENT:
        return 'bg-warning-100 text-warning-800';
      case JobStatus.IN_ESCROW:
        return 'bg-primary-100 text-primary-800';
      case JobStatus.SUBMITTED:
        return 'bg-secondary-100 text-secondary-800';
      case JobStatus.REVISION_REQUESTED:
        return 'bg-warning-100 text-warning-800';
      case JobStatus.COMPLETE:
        return 'bg-success-100 text-success-800';
      case JobStatus.DISPUTED:
        return 'bg-error-100 text-error-800';
      case JobStatus.RESOLVED:
        return 'bg-neutral-100 text-neutral-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-neutral-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-neutral-900 hover:text-primary-600 transition-colors">
            <Link to={`/jobs/${job.id}`}>{job.title}</Link>
          </h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(job.status)}`}>
            {job.status}
          </span>
        </div>
        
        <p className="mt-2 text-neutral-600 line-clamp-2">
          {job.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700"
            >
              {skill}
            </span>
          ))}
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center text-neutral-500">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="font-medium text-neutral-900">{job.budget} ETH</span>
          </div>
          
          <div className="flex items-center text-neutral-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>
              {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-neutral-50 px-6 py-3 flex justify-between items-center border-t border-neutral-200">
        <div className="flex items-center">
          <img 
            src={job.client.profilePicture} 
            alt={job.client.username}
            className="h-8 w-8 rounded-full mr-2 object-cover"
          />
          <span className="text-sm font-medium text-neutral-900">{job.client.username}</span>
        </div>
        
        <div className="flex items-center text-sm text-neutral-500">
          <Users className="h-4 w-4 mr-1" />
          <span>{job.bids.length} bids</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;